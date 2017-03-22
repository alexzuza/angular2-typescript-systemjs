import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ReactiveDrivenFormsComponent } from './reactive-driven-forms.component';
import { DynamicFormModule } from './dynamic-forms/dynamic-form.module';

@NgModule({
  imports:      [ 
    CommonModule,
    RouterModule.forChild([{
      path: 'reactive-driven-forms', component: ReactiveDrivenFormsComponent
    }]),
    DynamicFormModule
  ],
  declarations: [
    ReactiveDrivenFormsComponent
  ]
})
export class ReactiveDrivenFormsModule { }