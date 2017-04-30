
import { Injector } from '../di/injector';
import { Type } from '../type';
import { NgModuleRef } from './ng_module_factory';

export abstract class ComponentRef<C> {
  /**
   * Location of the Host Element of this Component Instance.
   */
  //abstract get location(): ElementRef;

  /**
   * The injector on which the component instance exists.
   */
  abstract get injector(): Injector;

  /**
   * The instance of the Component.
   */
  abstract get instance(): C;

  /**
   * The {@link ViewRef} of the Host View of this Component instance.
   */
  //abstract get hostView(): ViewRef;

  /**
   * The {@link ChangeDetectorRef} of the Component instance.
   */
  //abstract get changeDetectorRef(): ChangeDetectorRef;

  /**
   * The component type.
   */
  abstract get componentType(): Type<any>;

  /**
   * Destroys the component instance and all of the data structures associated with it.
   */
  abstract destroy(): void;

  /**
   * Allows to register a callback that will be called when the component is destroyed.
   */
  abstract onDestroy(callback: Function): void;
}

export abstract class ComponentFactory<C> {
  abstract get selector(): string;
  abstract get componentType(): Type<any>;
  /**
   * selector for all <ng-content> elements in the component.
   */
  abstract get ngContentSelectors(): string[];
  /**
   * the inputs of the component.
   */
  abstract get inputs(): {propName: string, templateName: string}[];
  /**
   * the outputs of the component.
   */
  abstract get outputs(): {propName: string, templateName: string}[];
  /**
   * Creates a new component.
   */
  abstract create(
    injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string|any,
    ngModule?: NgModuleRef<any>): ComponentRef<C>;
}
