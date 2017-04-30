

import { Type } from '../type';
import { InjectionToken } from './injection_token';
import { stringify } from '../util';

const _THROW_IF_NOT_FOUND = new Object();
export const THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;

class _NullInjector implements Injector {
  get(token: any, notFoundValue: any = _THROW_IF_NOT_FOUND): any {
    if (notFoundValue === _THROW_IF_NOT_FOUND) {
      throw new Error(`No provider for ${stringify(token)}!`);
    }
    return notFoundValue;
  }
}

export abstract class Injector {
  static THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
  static NULL: Injector = new _NullInjector();

  abstract  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T): T;

  abstract get(token: any, notFoundValue?: any): any;
}

