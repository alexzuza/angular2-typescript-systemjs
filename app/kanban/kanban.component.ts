import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Lane } from './model';
import 'rxjs/add/operator/first';
import { DragulaService } from './dragula.service';

@Component({
    selector: 'kanban',
    template: `
        <div class="lanes" [dragula]="drakeName" [dragulaOptions]="dragulaOptions" [dragulaModel]="lanes">
            <lane *ngFor="let lane of lanes; let i = index; trackBy: trackById"
                  [lane]="lane"
                  [attr.data-index]="i"
                  (editLane)="onEditLane(lane.id, lane.name, $event)"
                  (deleteLane)="onDeleteLane()"
                  (createNote)="onCreateNote(lane.id)"
                  (editNote)="onEditNote(lane.id, $event)"
                  (deleteNote)="onDeleteNote(lane.id, $event)"
                  (noteStatusChanged)="onNoteStatusChanged(lane.id, $event)">
            </lane>
        </div>
    `,
    host: { class: 'kanban' },
    providers: [DragulaService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class KanbanComponent implements OnDestroy {
    @Input() lanes: Lane[];

    @Output() laneMoved: EventEmitter<{ fromIndex: number, toIndex: number }> = new EventEmitter();
    @Output() laneEdited: EventEmitter<{ id: string, name: string, editing: boolean }> = new EventEmitter();

    @Output() createNote: EventEmitter<string> = new EventEmitter();
    @Output() noteEdited: EventEmitter<{ laneId: string, id: string, text: string, editing: boolean }> = new EventEmitter();
    @Output() noteMoved: EventEmitter<{ fromLaneId: string, fromIndex: number, toLaneId: string, toIndex?: number }> = new EventEmitter();
    @Output() noteDeleted: EventEmitter<{ laneId: string, id: string }> = new EventEmitter();
    @Output() noteStatusChanged: EventEmitter<any> = new EventEmitter();

    drakeName = 'lanesContainer';

    dragulaOptions = {
        moves: (el, container, handle) => {
            return handle.classList.contains('lane__drag');
        }
    };

    trackById(i: number, item: Lane) {
        return item.id;
    }

    constructor(private dragulaService: DragulaService) {
        this.dragulaService.dropModel.subscribe(([bagName, el, target, source, dragIndex, dropIndex]) => {
            if(bagName === this.drakeName) {
                this.laneMoved.emit({ fromIndex: dragIndex, toIndex: dropIndex })
            }
            if(bagName === 'notesContainer') {
                this.noteMoved.emit({ fromLaneId: source.dataset.key, fromIndex: dragIndex, toLaneId: target.dataset.key, toIndex: dropIndex })
            }
        });
    }

    ngAfterViewInit() {
      /*  let drake = dragula([this.lanesContainer.nativeElement], {
            moves: (el, container, handle) => {
                return handle.classList.contains('lane__drag');
            }
        });
        drake.on('drop', (el, target, source, sibling) => {
            const fromIndex = el.dataset.index;
            let toIndex;
            if (sibling) {
                if (fromIndex < sibling.dataset.index) {
                    toIndex = sibling.dataset.index - 1;
                } else {
                    toIndex = sibling.dataset.index;
                }
            } else {
                toIndex = this.lanes.length - 1;
            }
            console.log('from ' + fromIndex + ' to ' + toIndex);

            this.laneMoved.emit({ fromIndex, toIndex})
        });*/

     /*   this.drakeNotes = dragula();
        this.drakeNotes.on('drop', (el, target, source, sibling) => {
            if(!target) return;
            const fromIndex = el.dataset.index;
            let toIndex;

            const fromLaneId = source.dataset.key;
            const toLaneId = target.dataset.key;

            if(fromLaneId === toLaneId) {
                if (sibling) {
                    if (fromIndex < sibling.dataset.index) {
                        toIndex = sibling.dataset.index - 1;
                    } else {
                        toIndex = sibling.dataset.index;
                    }
                } else {
                    toIndex = this.lanes.length - 1;
                }
            } else {
                toIndex = sibling ? sibling.dataset.index : null;
            }

            // el.parentNode.removeChild(el);
            this.noteMoved.emit({ fromLaneId, fromIndex, toLaneId, toIndex })
        });*/
    }

    onEditLane(id: string, currentName: string, newName: string) {
        const name = newName !== undefined ? newName : currentName;
        const editing = newName  === undefined;

        this.laneEdited.emit({ id, name, editing })
    }

    onCreateNote(id: string) {
       this.createNote.emit(id);
    }

    onEditNote(laneId: string, event: { id: string, currentText: string, text: string }) {
        const text = event.text !== undefined ? event.text : event.currentText;
        const editing = event.text === undefined;

        this.noteEdited.emit({ laneId, id: event.id, text, editing });
    }

    onDeleteNote(laneId: string, event: any) {
        this.noteDeleted.emit({laneId, id: event});
    }

    onNoteStatusChanged(laneId: string, { id, status }) {
        this.noteStatusChanged.emit({ laneId, id, status });
    }

    ngOnDestroy() {
        this.dragulaService.destroy(this.drakeName);
        this.dragulaService.destroy('notesContainer');
    }
}
