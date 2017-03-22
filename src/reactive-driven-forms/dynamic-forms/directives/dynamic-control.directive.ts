import { 
  Directive, 
  Input, 
  OnChanges, 
  OnDestroy, 
  ViewContainerRef, 
  Type, 
  ComponentRef, 
  OnInit, 
  ComponentFactoryResolver 
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { Control } from '../models/control.interface';
import { FormControlModel } from '../models/form-control.model';


import { FormTextComponent } from '../components/form-text.component';
import { FormSelectComponent } from '../components/form-select.component';

const components: {[type: string]: Type<Control>} = {
  text: FormTextComponent,
  select: FormSelectComponent
};


@Directive({
  selector: '[dynamicControl]'
})
export class DynamicControlDirective implements Control, OnChanges, OnInit, OnDestroy {

  @Input() config: FormControlModel;

  @Input() group: FormGroup;

  component: ComponentRef<Control>;

  constructor(private resolver: ComponentFactoryResolver, private vcRef: ViewContainerRef) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Control>(components[this.config.type]);
    this.component = this.vcRef.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

  ngOnDestroy() {
     if (this.component) {
      this.component.destroy();
    }
  }
}
