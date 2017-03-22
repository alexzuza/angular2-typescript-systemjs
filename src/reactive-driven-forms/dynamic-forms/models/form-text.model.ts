import { FormValueControlModel, FormValueControlModelConfig } from './form-value-control.model';
import { CONTROL_TYPES } from './control.types';
import { serializable } from '../services/serializable.decorator';

export class FormTextModel<T> extends FormValueControlModel<T> {
    @serializable() type = CONTROL_TYPES.TEXT;

    constructor(private config: FormValueControlModelConfig<T>) {
        super(config);
    }
}

