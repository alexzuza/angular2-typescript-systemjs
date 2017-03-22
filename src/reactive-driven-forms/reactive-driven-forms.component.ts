import { Component } from '@angular/core';

import { FormControlModel } from './dynamic-forms/models/form-control.model';
import { FormTextModel } from './dynamic-forms/models/form-text.model';
import { FormSelectModel } from './dynamic-forms/models/form-select.model';

let model = [];

model.push(new FormTextModel(
    {
        key: 'hello',
        label: 'Name',
        value: '',
        showWhen: {
            key: 'name4',
            value: 'Hello'
        }
    }
))
for (var i = 1, len = 9; i <= len; i++) {
    model.push(new FormTextModel(
        {
            key: 'name' + i,
            label: 'Field ' + i,
            value: 'value' + i,
            css: {
                container: 'col-1-3'
            }
        }
    ))
}

for (var i = 1, len = 10; i <= len; i++) {
    model.push(new FormSelectModel(
        {
            key: 'select' + i,
            label: 'Select ' + i,
            options: ['A', 'B', 'C'],
            value: 'A',
            showWhen: {
                key: i > 1 ? 'select' + (i - 1) : '',
                value: 'B'
            },
            css: {
                container: 'col-1-5'
            }
        }
    ))
}

for (var i = 1, len = 4; i <= len; i++) {
    model.push(new FormTextModel(
        {
            key: 'name' + i,
            label: 'Field ' + i,
            value: 'value' + i,
            css: {
                container: 'col-1-2'
            }
        }
    ))
}

@Component({
    selector: 'my-reactive-driven-forms',
    template: `
        <h2>Dynamic forms</h2>
        <dynamic-form [config]="model"></dynamic-form>
    `,
})
export class ReactiveDrivenFormsComponent {
    model: FormControlModel[] = model;
}