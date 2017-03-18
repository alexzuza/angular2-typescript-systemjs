import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';

import { TreeComponent } from './tree.component';
import { Comp1Component } from "./leafs/comp1.component";
import { Comp2Component } from "./leafs/comp2.component";
import { Comp3Component } from "./leafs/comp3.component";
import { Comp4Component } from "./leafs/comp4.component";


@NgModule({
  imports:      [ 
    CommonModule,
    TreeRoutingModule
  ],
  declarations: [
    TreeComponent,
    Comp1Component,
    Comp2Component,
    Comp3Component,

    Comp4Component
  ]
})
export class TreeModule { }