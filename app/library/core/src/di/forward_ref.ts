

import { Type } from '../type';
import { stringify } from '../util';

export interface ForwardRefFn {
  (): any;
}


export function forwardRef(forwardRefFn: ForwardRefFn): Type<any> {
  (forwardRefFn as any).__forward_ref__ = forwardRef;
  forwardRefFn.toString = function() { return stringify(this()); };
  return (<Type<any>><any>forwardRefFn);
}


export function resolveForwardRef(type: any): any {
  if(typeof  type === 'function' && type.hasOwnProperty('__forward_ref__') &&
     type.__forward_ref__ === forwardRef) {
    return (<ForwardRefFn>type)();
  } else {
    return type;
  }
}
