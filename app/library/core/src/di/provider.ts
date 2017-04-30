
import { Type } from '../type';

export interface TypeProvider extends Type<any> {}

export interface ValueProvider {
  provide: any;

  useValue: any;

  multi?: boolean;
}

export interface ClassProvider {
  provide: any;

  useClass: Type<any>;

  multi?: boolean;
}

export interface ExistingProvider {
  provide: any;

  useExisting: any;

  multi?: boolean;
}

export interface FactoryProvider {
  provide: any;

  useFactory: Function;

  deps?: any[];

  multi?: boolean;
}

export type Provider =
  TypeProvider |
  ValueProvider |
  ClassProvider |
  ExistingProvider |
  FactoryProvider |
  any[];
