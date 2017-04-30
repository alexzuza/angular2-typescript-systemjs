


import { Type } from '../type';
import { stringify } from '../util';
import { ReflectiveKey } from './reflective_key';
import { ReflectiveInjector } from './reflective_injector';
import { ERROR_ORIGINAL_ERROR, getOriginalError } from '../errors';
import { wrappedError } from '../error_handler';

function findFirstClosedCycle(keys: any[]): any[] {
  const res: any[] = [];
  for (let i = 0; i < keys.length; ++i) {
    if (res.indexOf(keys[i]) > -1) {
      res.push(keys[i]);
      return res;
    }
    res.push(keys[i]);
  }
  return res;
}

function constructResolvingPath(keys: any[]): string {
  if (keys.length > 1) {
    const reversed = findFirstClosedCycle(keys.slice().reverse());
    const tokenStrs = reversed.map(k => stringify(k.token));
    return ' (' + tokenStrs.join(' -> ') + ')';
  }

  return '';
}

export function instantiationError(
  injector: ReflectiveInjector, originalException: any, originalStack: any,
  key: ReflectiveKey): InjectionError {
  return injectionError(injector, key, function(this: InjectionError) {
    const first = stringify(this.keys[0].token);
    return `${getOriginalError(this).message}: Error during instantiation of ${first}!${constructResolvingPath(this.keys)}.`;
  }, originalException);
}


export function invalidProviderError(provider: any) {
  return Error(
    `Invalid provider - only instances of Provider and Type are allowed, got ${provider}`
  );
}

export function outOfBoundsError(index: number) {
  return Error(`Index ${index} is out-of-bounds.`);
}
export interface InjectionError extends Error {
  keys: ReflectiveKey[];
  injectors: ReflectiveInjector[];
  constructResolvingMessage: (this: InjectionError) => string;
  addKey(injector: ReflectiveInjector, key: ReflectiveKey): void;
}

function injectionError(
  injector: ReflectiveInjector, key: ReflectiveKey,
  constructResolvingMessage: (this: InjectionError) => string,
  originalError?: Error): InjectionError {
  const error = (originalError ? wrappedError('', originalError) : Error()) as InjectionError;
  error.addKey = addKey;
  error.keys = [key];
  error.injectors = [injector];
  error.constructResolvingMessage = constructResolvingMessage;
  error.message = error.constructResolvingMessage();
  (error as any)[ERROR_ORIGINAL_ERROR] = originalError;
  return error;
}

export function noProviderError(injector: ReflectiveInjector, key: ReflectiveKey): InjectionError {
  return injectionError(injector, key, function(this: InjectionError) {
    const first = stringify(this.keys[0].token);
    return `No provider for ${first}!${constructResolvingPath(this.keys)}`;
  });
}

export function cyclicDependencyError(
  injector: ReflectiveInjector, key: ReflectiveKey): InjectionError {
  return injectionError(injector, key, function(this: InjectionError) {
    return `Cannot instantiate cyclic dependency!${constructResolvingPath(this.keys)}`;
  });
}


export function noAnnotationError(typeOrFunc: Type<any> | Function, params: any[][]): Error {
  const signature: string[] = [];
  for (let i = 0, ii = params.length; i < ii; i++) {
    const parameter = params[i];
    if (!parameter || parameter.length == 0) {
      signature.push('?');
    } else {
      signature.push(parameter.map(stringify).join(' '));
    }
  }
  return Error(
    'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
    signature.join(', ') + '). ' +
    'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
    stringify(typeOrFunc) + '\' is decorated with Injectable.');
}

export function mixingMultiProvidersWithRegularProvidersError(
  provider1: any, provider2: any): Error {
  return Error(`Cannot mix multi providers and regular providers, got: ${provider1} ${provider2}`);
}

function addKey(this: InjectionError, injector: ReflectiveInjector, key: ReflectiveKey): void {
  this.injectors.push(injector);
  this.keys.push(key);
  this.message = this.constructResolvingMessage();
}
