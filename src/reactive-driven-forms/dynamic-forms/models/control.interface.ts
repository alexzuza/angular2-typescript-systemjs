import { FormGroup } from '@angular/forms';
import { FormControlModel } from './form-control.model';

export interface Control {
  config: FormControlModel,
  group: FormGroup
}
