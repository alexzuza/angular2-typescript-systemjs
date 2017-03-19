import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { ShareModule } from '../shared/share.module';

import { TableLayoutComponent } from './components/table-layout.component';
import { DataTableComponent } from './components/datatable.component';
import { ColumnComponent } from './components/column.component';
import { PaginationComponent } from './components/pagination.component';


@NgModule({
  imports:      [ 
    CommonModule,
    ShareModule,
    TableRoutingModule
  ],
  declarations: [
    TableLayoutComponent,
    DataTableComponent,
    ColumnComponent,
    PaginationComponent
  ]
})
export class TableModule { }