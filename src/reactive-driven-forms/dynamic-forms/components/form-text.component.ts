import { Component, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBaseControlComponent } from '../directives/form-base.component';

@Component({
  selector: 'form-text',
  template: `
    <div class="form-control" [formGroup]="group" *ngIf="!config.disabled">
      <label class="form-control--label" [ngClass]="config.css.label">{{ config.label }}</label>
      <div class="form-control--body" [ngClass]="config.css.control">
        <input type="text" [formControlName]="config.key">
      </div>
    </div>
  `,
  host: {
    '[class]': 'config.css.container'
  }
})
export class FormTextComponent extends FormBaseControlComponent {
}
