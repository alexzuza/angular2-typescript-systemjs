

import { PlatformReflectionCapabilities } from './platform_reflection_capabilities';
import { global } from '../util';
import { isType, Type } from '../type';
import { GetterFn, MethodFn, SetterFn } from './types';

export const DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;

export class ReflectionCapabilities implements PlatformReflectionCapabilities {
  private _reflect: any;

  constructor(reflect?: any) {
    this._reflect = reflect || global['Reflect'];
  }

  isReflectionEnabled(): boolean {
    return true;
  }

  factory<T>(t: Type<T>): (args: any[]) => T {
    return (...args: any[]) => new t(...args);
  }

  _zipTypesAndAnnotations(paramTypes: any[], paramAnnotations: any[]): any[][] {
    let result: any[][];

    if(typeof paramTypes === 'undefined') {
      result = new Array(paramAnnotations.length);
    } else {
      result = new Array(paramTypes.length);
    }

    for(let i = 0; i < result.length; i++) {
      // TS outputs Object for parameters without types, while Traceur omits
      // the annotations. For now we preserve the Traceur behavior to aid
      // migration, but this can be revisited/
      if(typeof paramTypes === 'undefined') {
        result[i] = [];
      } else if (paramTypes[i] != Object) {
        result[i] = [paramTypes[i]];
      } else {
        result[i] = [];
      }

      if(paramAnnotations && paramAnnotations[i] != null) {
        result[i] = result[i].concat(paramAnnotations[i]);
      }
    }
    return result;
  }

  _ownParameters(type: Type<any>, parentCtor: any): any[][] | null {
    if (DELEGATE_CTOR.exec(type.toString())) {
      return null;
    }

    // Prefer the direct API
    if((<any>type).parameters && (<any>type).parameters !== parentCtor.parameters()) {
      return (<any>type).parameters;
    }

    // API of tsickle for lowering decorators to properties on the class.
    const tsickleCtorParams = (<any>type).ctorParameters;
    if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
      // Newer tsickle uses a function closure
      // Retain the non-function case for compatibility with older tsickle
      const ctorParameters =
        typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
      const paramTypes = ctorParameters.map((ctorParam: any) => ctorParam && ctorParam.type);
      const paramAnnotations = ctorParameters.map(
        (ctorParam: any) =>
        ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
      return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
    }

    // API for metadata created by invoking the decorators.
    if (this._reflect != null && this._reflect.getOwnMetadata != null) {
      const paramAnnotations = this._reflect.getOwnMetadata('parameters', type);
      const paramTypes = this._reflect.getOwnMetadata('design:paramtypes', type);
      if (paramTypes || paramAnnotations) {
        return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
      }
    }

    // If a class has no decorators, at least create metadata
    // based on function.length.
    // Note: We know that this is a real constructor as we checked
    // the content of the constructor above.
    return new Array((<any>type.length)).fill(undefined);
  }

  parameters(type: Type<any>): any[] {
    if(!isType(type)) {
      return [];
    }
    const parentCtor = getParentCtor(type);
    let parameters = this._ownParameters(type, parentCtor);
    if(!parameters && parentCtor !== Object) {
      parameters = this.parameters(parentCtor);
    }

    return parameters || [];
  }

  hasLifecycleHook(type: any, lcProperty: string): boolean {
    // todo
    return true;
  }

  annotations(type: Type<any>): any[] {
    // todo
    return [];
  }

  propMetadata(typeOrFunc: Type<any>): { [p: string]: any[] } {
    // todo
    return {};
  }

  getter(name: string): GetterFn {
    // todo
    return () => {};
  }

  setter(name: string): SetterFn {
    // todo
    return () => {};
  }

  method(name: string): MethodFn {
    return () => {};
  }

  importUri(type: Type<any>): string {
    // todo
    return '';
  }

  resourceUri(type: Type<any>): string {
    // todo
    return '';
  }

  resolveIdentifier(name: string, moduleId: string, members: string[] | any, runtime: any): any {
    // todo
    return undefined;
  }

  resolveEnum(enumIdentifier: any, name: string): any {
    // todo
    return undefined;
  }


}

function convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
  if (!decoratorInvocations) {
    return [];
  }
  return decoratorInvocations.map(decoratorInvocation => {
    const decoratorType = decoratorInvocation.type;
    const annotationCls = decoratorType.annotationCls;
    const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
    return new annotationCls(...annotationArgs);
  });
}

function getParentCtor(ctor: Function): Type<any> {
  const parentProto = Object.getPrototypeOf(ctor.prototype);
  const parentCtor = parentProto ? parentProto.constructor : null;
  // Note: we always use `Object` as the null value
  // to simplify checking later on.
  return parentCtor || Object;
}
