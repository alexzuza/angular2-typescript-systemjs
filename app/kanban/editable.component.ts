import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'editable',
    template: `
        <textarea class="input" *ngIf="editing; else valueTmpl" #autofocus type="text" autoFocus class="editing"
               [value]="value" (blur)="handleFinishEdit($event)"
               (keypress)="handleFinishEdit($event)"
        ></textarea>
        <ng-template #valueTmpl>
           <span>
               <div class="input" (click)="handleValueClick()" >{{value}}</div>
               <span *ngIf="onDelete" class="delete" (click)="handleDelete()">&times;</span>
            </span>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditableComponent {
    @Input() value: string;
    @Input() editing: boolean;
    @Input() onDelete: boolean;

    @Output() valueClicked: EventEmitter<any> = new EventEmitter();

    @Output() edited: EventEmitter<string> = new EventEmitter();

    @ViewChild('autofocus') autofocus: ElementRef;

    handleValueClick() {
        this.valueClicked.emit();
    }

    handleFinishEdit(e) {
        if ((e.type === 'keypress')) {
            return;
        }

        const value = e.target.value;
        this.edited.emit(value);
    }

    ngOnChanges() {
        if (this.editing) {
            setTimeout(() => this.autofocus.nativeElement.focus())
        }
    }

}
