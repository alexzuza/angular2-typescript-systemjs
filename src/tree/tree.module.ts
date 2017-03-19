import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';

import { TreeComponent } from './tree.component';

import { components } from './components';

@NgModule({
  imports:      [ 
    CommonModule,
    TreeRoutingModule
  ],
  declarations: [
    TreeComponent,
    ...components
  ]
})
export class TreeModule { }