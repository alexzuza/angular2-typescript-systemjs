import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBaseControlComponent } from '../directives/form-base.component';

@Component({
  selector: 'form-text',
  template: `
    <div class="form-control" [formGroup]="group" *ngIf="!config.disabled">
      <label class="form-control--label">{{ config.label }}</label>
      <div class="form-control--body" [ngClass]="config.css.control">
        <select [formControlName]="config.key">
          <option *ngFor="let option of config.options" [value]="option">{{option}}</option>
        </select>
      </div>
    </div>
  `,
  host: {
    '[class]': 'config.css.container'
  }
})
export class FormSelectComponent extends FormBaseControlComponent {

}
