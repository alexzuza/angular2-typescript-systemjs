import { FormValueControlModel, FormValueControlModelConfig } from './form-value-control.model';
import { CONTROL_TYPES } from "./control.types";
import { serializable } from '../services/serializable.decorator';

export interface FormGroupModelConfig<T> extends FormValueControlModelConfig<T> {
    options: any[];
}


export class FormSelectModel<T> extends FormValueControlModel<T> {
    @serializable() type = CONTROL_TYPES.SELECT;

    @serializable() options: any[];

    constructor(private config: FormGroupModelConfig<T>) {
        super(config);
        this.options = config.options;
    }
}

