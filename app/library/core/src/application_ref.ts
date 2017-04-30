
import { Provider } from './di/provider';
import { InjectionToken } from './di/injection_token';
import { ReflectiveInjector } from './di/reflective_injector';
import { forwardRef } from './di/forward_ref';
import { Injector } from './di/injector';
import { Type } from './type';
import { PLATFORM_INITIALIZER } from './application_tokens';
import { Injectable } from './di/metadata';
import { NgModuleRef } from './linker/ng_module_factory';
import { CompilerFactory, CompilerOptions } from './linker/compiler';
import { NgZone } from './zone/ng_zone';

let _devMode: boolean = true;
let _runModeLocked: boolean = false;
let _platform: PlatformRef;

export const ALLOW_MULTIPLE_PLATFORMS = new InjectionToken<boolean>('AllowMultipleToken');

export function isDevMode(): boolean {
  _runModeLocked = true;
  return _devMode;
}

export function createPlatform(injector: Injector): PlatformRef {
  if (_platform && !_platform.destroyed &&
    !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
    throw new Error(
      'There can be only one platform. Destroy the previous one to create a new one.');
  }
  _platform = injector.get(PlatformRef);
  const inits = injector.get(PLATFORM_INITIALIZER, null);
  if (inits) inits.forEach((init: any) => init());
  return _platform;
}

export function createPlatformFactory(
    parentPlatformFactory: ((extraProviders?: Provider[]) => PlatformRef) | null,
    name: string,
    providers: Provider[] = []): (extraProviders?: Provider[]) => PlatformRef {
  const marker = new InjectionToken(`Platform: ${name}`);
  return (extraProviders: Provider[] = []) => {
    let platform = getPlatform();
    if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, false)) {
      if (parentPlatformFactory) {
        parentPlatformFactory(
          providers.concat(extraProviders).concat({provide: marker, useValue: true}));
      } else {
        createPlatform(ReflectiveInjector.resolveAndCreate(
          providers.concat(extraProviders).concat({provide: marker, useValue: true})));
      }
    }
    return assertPlatform(marker);};
}

export function assertPlatform(requiredToken: any): PlatformRef {
  const platform = getPlatform();

  if (!platform) {
    throw new Error('No platform exists!');
  }

  if (!platform.injector.get(requiredToken, null)) {
    throw new Error(
      'A platform with a different configuration has been created. Please destroy it first.');
  }

  return platform;
}


export function getPlatform(): PlatformRef|null {
  return _platform && !_platform.destroyed ? _platform : null;
}

export abstract class PlatformRef {

/*
  abstract bootstrapModuleFactory<M>(moduleFactory: NgModuleFactory<M>): Promise<NgModuleRef<M>>;
*/

  abstract bootstrapModule<M>(
    moduleType: Type<M>,
    compilerOptions?: CompilerOptions|CompilerOptions[]): Promise<NgModuleRef<M>>;

  abstract get injector(): Injector;

  abstract get destroyed(): boolean;
/*  abstract onDestroy(callback: () => void): void;



  abstract destroy(): void;

  */
}

@Injectable()
export class PlatformRef_ extends PlatformRef {

  private _destroyed: boolean = false;

  constructor(private _injector: Injector) { super(); }

  get injector(): Injector { return this._injector; }

  get destroyed() { return this._destroyed; }

  bootstrapModule<M>(
    moduleType: Type<M>,
    compilerOptions?: CompilerOptions|CompilerOptions[]): Promise<NgModuleRef<M>> {
    return this._bootstrapModuleWithZone(moduleType, compilerOptions);
  }

  private _bootstrapModuleWithZone<M>(
    moduleType: Type<M>, compilerOptions: CompilerOptions|CompilerOptions[] = [],
    ngZone?: NgZone): Promise<NgModuleRef<M>> {
    const compilerFactory: CompilerFactory = this.injector.get(CompilerFactory);
    const compiler = compilerFactory.createCompiler(
      Array.isArray(compilerOptions) ? compilerOptions : [compilerOptions]);

    return compiler.compileModuleAsync(moduleType)
      .then((moduleFactory) => {
        alert('Hooray');
        return {} as NgModuleRef<any>;
      });
  }
}
