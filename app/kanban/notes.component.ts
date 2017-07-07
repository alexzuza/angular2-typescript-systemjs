import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Note } from './model';

@Component({
    selector: 'notes',
    template: `
        <ul class="notes-list" [dragula]="drakeName" [dragulaOptions]="dragulaOptions" [dragulaModel]="notes" [attr.data-key]="laneId">
            <li *ngFor="let note of notes; let i = index; trackBy: trackById" class="note"
                [attr.data-index]="i"
                [ngClass]="'note--' + note.status.toString()">
                <span class="note__drag"></span>
                <editable
                      [value]="note.text"
                      [editing]="note.editing" 
                      (edited)="onEditNote(note.id, note.text, $event)"
                      (valueClicked)="onEditNote(note.id, note.text, $event)"></editable>
                <div class="note-status">
                    <label>Status</label>
                    <select [value]="note.status" (change)="noteStatusChanged.emit({ id: note.id, status: $event.target.value })">
                        <option value="0">In Progress</option>
                        <option value="1">Overdue</option>
                        <option value="2">Completed</option>
                    </select>
                </div>
                <span class="delete" (click)="handleDelete(note.id)">&times;</span>
            </li>
        </ul>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent {
    @Input() laneId: string;
    @Input() notes: Note[];

    drakeName = 'notesContainer';

    dragulaOptions = {
        moves: (el, container, handle) => {
            return handle.classList.contains('note__drag');
        }
    };

    @Output() editNote: EventEmitter<any> = new EventEmitter();
    @Output() noteStatusChanged: EventEmitter<any> = new EventEmitter();
    @Output() deleteNote: EventEmitter<any> = new EventEmitter();

    @ViewChild('notesContainer') notesContainer: ElementRef;

    onEditNote(id: string, currentText: string, newText: string) {
        this.editNote.emit({ id, currentText, text: newText })
    }

    handleDelete(id: string) {
        this.deleteNote.emit(id);
    }
}
