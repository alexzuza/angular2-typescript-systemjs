
import { Injector, THROW_IF_NOT_FOUND } from './injector';
import { Provider } from './provider';
import {
  ReflectiveDependency, ResolvedReflectiveFactory, ResolvedReflectiveProvider,
  resolveReflectiveProviders
} from './reflective_provider';

import { ReflectiveKey } from './reflective_key';
import { Self, SkipSelf } from './metadata';
import { cyclicDependencyError, outOfBoundsError, instantiationError, noProviderError } from './reflective_errors';

const UNDEFINED = new Object();

export abstract class ReflectiveInjector implements  Injector {

  static resolve(providers: Provider[]): ResolvedReflectiveProvider[] {
    return resolveReflectiveProviders(providers);
  }

  static resolveAndCreate(providers: Provider[], parent?: Injector): any {
    const ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
    return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);

  }

  static fromResolvedProviders(providers: ResolvedReflectiveProvider[], parent?: Injector):
  ReflectiveInjector {
    return new ReflectiveInjector_(providers, parent);
  }

  abstract get(token: any, notFoundValue?: any): any;


}

export class ReflectiveInjector_ implements ReflectiveInjector {
  /** @internal */
  _constructionCounter: number = 0;
  /** @internal */
  public _providers: ResolvedReflectiveProvider[];
  /** @internal */
  public _parent: Injector|null;

  keyIds: number[];
  objs: any[];
  /**
   * Private
   */
  constructor(_providers: ResolvedReflectiveProvider[], _parent?: Injector) {
    this._providers = _providers;
    this._parent = _parent || null;

    const len = _providers.length;

    this.keyIds = new Array(len);
    this.objs = new Array(len);

    for (let i = 0; i < len; i++) {
      this.keyIds[i] = _providers[i].key.id;
      this.objs[i] = UNDEFINED;
    }
  }

  get(token: any, notFoundValue: any = THROW_IF_NOT_FOUND): any {
    return this._getByKey(ReflectiveKey.get(token), null, notFoundValue);
  }

  get parent(): Injector|null { return this._parent; }

  resolveAndCreateChild(providers: Provider[]): ReflectiveInjector {
    const ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
    return this.createChildFromResolved(ResolvedReflectiveProviders);
  }

  createChildFromResolved(providers: ResolvedReflectiveProvider[]): ReflectiveInjector {
    const inj = new ReflectiveInjector_(providers);
    inj._parent = this;
    return inj;
  }

  resolveAndInstantiate(provider: Provider): any {
    return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
  }

  instantiateResolved(provider: ResolvedReflectiveProvider): any {
    return this._instantiateProvider(provider);
  }

  getProviderAtIndex(index: number): ResolvedReflectiveProvider {
    if (index < 0 || index >= this._providers.length) {
      throw outOfBoundsError(index);
    }
    return this._providers[index];
  }

  /** @internal */
  _new(provider: ResolvedReflectiveProvider): any {
    if (this._constructionCounter++ > this._getMaxNumberOfObjects()) {
      throw cyclicDependencyError(this, provider.key);
    }
    return this._instantiateProvider(provider);
  }

  private _getMaxNumberOfObjects(): number { return this.objs.length; }

  private _instantiateProvider(provider: ResolvedReflectiveProvider): any {
    if (provider.multiProvider) {
      const res = new Array(provider.resolvedFactories.length);
      for (let i = 0; i < provider.resolvedFactories.length; ++i) {
        res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
      }
      return res;
    } else {
      return this._instantiate(provider, provider.resolvedFactories[0]);
    }
  }

  private _instantiate(
    provider: ResolvedReflectiveProvider,
    ResolvedReflectiveFactory: ResolvedReflectiveFactory): any {
    const factory = ResolvedReflectiveFactory.factory;

    let deps: any[];
    try {
      deps =
        ResolvedReflectiveFactory.dependencies.map(dep => this._getByReflectiveDependency(dep));
    } catch (e) {
      if (e.addKey) {
        e.addKey(this, provider.key);
      }
      throw e;
    }

    let obj: any;
    try {
      obj = factory(...deps);
    } catch (e) {
      throw instantiationError(this, e, e.stack, provider.key);
    }

    return obj;
  }

  private _getByReflectiveDependency(dep: ReflectiveDependency): any {
    return this._getByKey(dep.key, dep.visibility, dep.optional ? null : THROW_IF_NOT_FOUND);
  }

  private _getByKey(key: ReflectiveKey, visibility: Self|SkipSelf|null, notFoundValue: any): any {
    if (key === INJECTOR_KEY) {
      return this;
    }

    if (visibility instanceof Self) {
      return this._getByKeySelf(key, notFoundValue);

    } else {
      return this._getByKeyDefault(key, notFoundValue, visibility);
    }
  }

  private _getObjByKeyId(keyId: number): any {
    for (let i = 0; i < this.keyIds.length; i++) {
      if (this.keyIds[i] === keyId) {
        if (this.objs[i] === UNDEFINED) {
          this.objs[i] = this._new(this._providers[i]);
        }

        return this.objs[i];
      }
    }

    return UNDEFINED;
  }

  /** @internal */
  _throwOrNull(key: ReflectiveKey, notFoundValue: any): any {
    if (notFoundValue !== THROW_IF_NOT_FOUND) {
      return notFoundValue;
    } else {
      throw noProviderError(this, key);
    }
  }

  /** @internal */
  _getByKeySelf(key: ReflectiveKey, notFoundValue: any): any {
    const obj = this._getObjByKeyId(key.id);
    return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
  }

  /** @internal */
  _getByKeyDefault(key: ReflectiveKey, notFoundValue: any, visibility: Self|SkipSelf|null): any {
    let inj: Injector|null;

    if (visibility instanceof SkipSelf) {
      inj = this._parent;
    } else {
      inj = this;
    }

    while (inj instanceof ReflectiveInjector_) {
      const inj_ = <ReflectiveInjector_>inj;
      const obj = inj_._getObjByKeyId(key.id);
      if (obj !== UNDEFINED) return obj;
      inj = inj_._parent;
    }
    if (inj !== null) {
      return inj.get(key.token, notFoundValue);
    } else {
      return this._throwOrNull(key, notFoundValue);
    }
  }

  get displayName(): string {
    const providers =
      _mapProviders(this, (b: ResolvedReflectiveProvider) => ' "' + b.key.displayName + '" ')
        .join(', ');
    return `ReflectiveInjector(providers: [${providers}])`;
  }

  toString(): string { return this.displayName; }
}

const INJECTOR_KEY = ReflectiveKey.get(Injector);

function _mapProviders(injector: ReflectiveInjector_, fn: Function): any[] {
  const res: any[] = new Array(injector._providers.length);
  for (let i = 0; i < injector._providers.length; ++i) {
    res[i] = fn(injector.getProviderAtIndex(i));
  }
  return res;
}
