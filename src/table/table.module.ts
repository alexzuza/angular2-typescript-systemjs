import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';

import { TableComponent } from './table.component';
import { DataTableComponent } from './datatable.component';
import { ColumnComponent } from "./column.component";


@NgModule({
  imports:      [ 
    CommonModule,
    TableRoutingModule
  ],
  declarations: [
    TableComponent,
    DataTableComponent,
    ColumnComponent
  ]
})
export class TableModule { }