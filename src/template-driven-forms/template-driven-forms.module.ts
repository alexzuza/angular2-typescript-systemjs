import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TemplateDrivenFormsComponent } from './template-driven-forms.component';
import { MyInputComponent } from './custom-controls/my-input.component';
@NgModule({
  imports:      [ 
    CommonModule,
    FormsModule,
    RouterModule.forChild([{
      path: 'template-driven-forms', component: TemplateDrivenFormsComponent
    }])
  ],
  declarations: [
    TemplateDrivenFormsComponent,
    MyInputComponent
  ]
})
export class TemplateDrivenFormsModule { }