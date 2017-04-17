import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChipsComponent } from './chips/chips.component';

export const routes: Routes = [
  { path: 'chips', component: ChipsComponent },
  { path: '', redirectTo: '/chips', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }