import { FormControlModel, FormControlModelConfig } from './form-control.model';
import { CONTROL_TYPES } from './control.types';

import { serializable } from '../services/serializable.decorator';

export interface FormGroupModelConfig extends FormControlModelConfig {
    controls: FormControlModel[];
}


export class FormGroupModel extends FormControlModel {
    @serializable() controls: FormControlModel[];

    @serializable() type = CONTROL_TYPES.GROUP;

    constructor(private config: FormGroupModelConfig) {
        super(config);

        this.controls = config.controls;
    }
}

