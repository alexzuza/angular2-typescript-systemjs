import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-custom-input',
    template:  `
      <input type="number" 
        name="someName" required 
        [(ngModel)]="value"
        (change)="onChange($event)" >
    `
})
export class MyInputComponent {

    @Input() value: number = 0;

    @Output() valueChange: EventEmitter<any> = new EventEmitter()

    onChange(event) {
        this.valueChange.emit(this.value);
    }
     
}