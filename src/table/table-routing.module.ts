import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableLayoutComponent } from './components/table-layout.component';


export const routes: Routes = [
  { path: 'table', component: TableLayoutComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TableRoutingModule { }