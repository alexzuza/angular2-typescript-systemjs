

import { resolveForwardRef } from './forward_ref';
import { stringify } from '../util';

export class ReflectiveKey {
  constructor(public token: Object, public id: number) {
    if(!token) {
      throw new Error('Token must be defined');
    }
  }

  static get(token: Object): ReflectiveKey {
    return _globalKeyRegistry.get(resolveForwardRef(token))
  }

  get displayName(): string { return stringify(this.token); }

  static get numberOfKeys(): number {
    return _globalKeyRegistry.numberOfKeys;
  }
}

export class KeyRegistry {
  private _allKeys = new Map<Object, ReflectiveKey>();

  get(token: Object): ReflectiveKey {
    if(token instanceof ReflectiveKey) return token;

    if(this._allKeys.has(token)) {
      return this._allKeys.get((token)) !;
    }

    const newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
    this._allKeys.set(token, newKey);
    return newKey;
  }

  get numberOfKeys(): number {
    return this._allKeys.size;
  }
}

const _globalKeyRegistry = new KeyRegistry();
