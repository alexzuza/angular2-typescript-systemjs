import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DynamicFormService } from '../services/dynamic-form.service';
import { FormControlModel } from '../models/form-control.model';
//  <pre>{{ form.getRawValue() | json }}</pre>
@Component({
    selector: 'dynamic-form',
    template: `
        <div class="form-wrapper" [formGroup]="form">
            <ng-container *ngFor="let control of config" dynamicControl [group]="form" [config]="control"></ng-container>
            <pre class="model">{{ config | json}}</pre>
        </div>
    `
})
export class DynamicFormComponent {

    @Input() config: FormControlModel[];

    form: FormGroup;

    constructor(private formService: DynamicFormService) {}

    ngOnInit() {
        this.form = this.formService.buildFormGroup(this.config);
    }
}