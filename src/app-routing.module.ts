import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from "./page-not-found.component";

import { SandBoxComponent } from './sandbox/sandbox.component';

export const routes: Routes = [
  { path: 'sandbox', component: SandBoxComponent },
  { path: '', redirectTo: '/sandbox', pathMatch: 'full' }
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