import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './directives/dynamic-form.component';
import { DynamicControlDirective } from './directives/dynamic-control.directive';


import { FormTextComponent } from './components/form-text.component';
import { FormSelectComponent } from './components/form-select.component';

import { DynamicFormService } from './services/dynamic-form.service';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicFormComponent,
        DynamicControlDirective,

        FormTextComponent,
        FormSelectComponent
    ],
    exports: [
        DynamicFormComponent,
        ReactiveFormsModule
    ],
    entryComponents: [
        FormTextComponent,
        FormSelectComponent
    ],
    providers: [DynamicFormService]
})
export class DynamicFormModule { }
