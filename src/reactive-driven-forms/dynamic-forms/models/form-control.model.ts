import { Subject } from 'rxjs/Subject';
import { CONTROL_TYPES } from './control.types';

import { serializable, serialize } from '../services/serializable.decorator';

export class FormControlCondition {
    key: string;
    value: string;
}

export interface CssClassConfig {
    container?: string;

    control?: string;

    label?: string;
}

export interface FormControlModelConfig {
    key: string;

    label?: string;

    disabled?: boolean;

    showWhen?: FormControlCondition;

    css?: CssClassConfig
}


export abstract class FormControlModel {

    @serializable() key: string;

    abstract readonly type: string;

    @serializable() label?: string;

    @serializable() disabled: boolean;

    @serializable() showWhen: FormControlCondition;

    @serializable() css: CssClassConfig;

    disabledUpdates: Subject<boolean> = new Subject<boolean>();;

    constructor(config: FormControlModelConfig) {
        this.key = config.key;
        this.label = config.label || config.key;
        this.css = config.css || { container: 'col-1-1'};
        this.disabled = this.disabled || false;
        this.showWhen = config.showWhen;
        this.disabledUpdates.subscribe((value: boolean) => this.disabled = value);
    }
    
    toJSON() {
        return serialize(this);
    }
}

