import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'lane',
    template: `
        <h2 class="lane__name">
            <div class="lane__editable">{{ lane.name }} <button class="add-note" (click)="createNote.emit()">+ note</button></div>
            <span class="lane__drag"></span>
        </h2>
        <notes 
                [notes]="lane.notes"
                [laneId]="lane.id"
                (editNote)="onEditNote($event)"
                (deleteNote)="onDeleteNote($event)"
                (noteStatusChanged)="noteStatusChanged.emit($event)"
        ></notes>
    `,
    host: { class: 'lane' },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaneComponent {
    @Input() lane: any;

    @Output() createNote: EventEmitter<string> = new EventEmitter();
    @Output() editLane: EventEmitter<any> = new EventEmitter();
    @Output() editNote: EventEmitter<any> = new EventEmitter();
    @Output() deleteNote: EventEmitter<any> = new EventEmitter();
    @Output() noteStatusChanged: EventEmitter<any> = new EventEmitter();

    onEditLane(name: string) {
        this.editLane.emit(name);
    }

    onEditNote(event: any) {
        this.editNote.emit(event)
    }

    onDeleteNote(event: any) {
        this.deleteNote.emit(event);
    }
}
