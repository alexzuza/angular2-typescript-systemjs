import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { CONTROL_TYPES } from '../models/control.types';

import { FormControlModel } from '../models/form-control.model';
import { FormValueControlModel, FormControlValue } from '../models/form-value-control.model';
import { FormGroupModel } from '../models/form-group.model';

@Injectable()
export class DynamicFormService {

    constructor(private formBuilder: FormBuilder) { }


    buildFormGroup(controls: FormControlModel[]): FormGroup {

        let formGroup: { [id: string]: AbstractControl; } = {};

        controls.forEach(model => {
            switch (model.type) {
                case CONTROL_TYPES.GROUP:
                    formGroup[model.key] = this.buildFormGroup((model as FormGroupModel).controls);
                    break;
                default:
                    formGroup[model.key] = new FormControl({
                        value: (model as FormValueControlModel<FormControlValue>).value,
                        disabled: model.disabled
                    });
            }
        });

        return this.formBuilder.group(formGroup);
    }
}
