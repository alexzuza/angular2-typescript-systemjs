import { FormControlModel, FormControlModelConfig } from './form-control.model';
import { CONTROL_TYPES } from './control.types';
import { serializable } from '../services/serializable.decorator';

export type FormControlValue = boolean | number | string | Array<boolean | number | string>;

export interface FormValueControlModelConfig<T> extends FormControlModelConfig {
    value?: T;
}


export abstract class FormValueControlModel<T> extends FormControlModel {

    @serializable() value?: T | null;

    constructor(config: FormValueControlModelConfig<T>) {
        super(config);
        this.value = config.value;
    }

}
