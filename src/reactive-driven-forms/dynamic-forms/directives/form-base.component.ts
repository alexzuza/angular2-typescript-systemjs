import { OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Control } from '../models/control.interface';
import { FormControlModel } from '../models/form-control.model';
import { FormValueControlModel, FormControlValue } from '../models/form-value-control.model';

export abstract class FormBaseControlComponent implements Control, OnInit, OnDestroy {
    group: FormGroup;

    config: FormControlModel;

    control: FormControl;

    private _subscriptions: Subscription[] = [];

    ngOnInit() {
        this.control = this.group.get(this.config.key) as FormControl;

        this._subscribeToValueChanges();
        this._setUpConditions(); 
    }

    _subscribeToValueChanges(): void {
        if (!(this.config instanceof FormValueControlModel))  {
            return;
        }

        this._subscriptions.push(this.control.valueChanges.subscribe((value: FormControlValue) => {
            let model = this.config as FormValueControlModel<FormControlValue>;

            if (model.value !== value) {
                model.value = value;
            }
        }));
    }

    _setUpConditions() {
        if(!this.config.showWhen) {
            return;
        }

        let relatedControl = this.group.get(this.config.showWhen.key);
        if(!relatedControl) {
            return;
        }

        this._updateDisabled();
        this._subscriptions.push(relatedControl.valueChanges.subscribe(x => this._updateDisabled()));      
    }

    _updateDisabled(): void {
        let relatedControl = this.group.get(this.config.showWhen.key);
        const disabled = relatedControl.value !== this.config.showWhen.value;
        this.config.disabledUpdates.next(disabled);
        disabled ? this.control.disable() : this.control.enable();
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach(x => x.unsubscribe());
    }
}