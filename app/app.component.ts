import { Component } from '@angular/core';
import { Lane } from './kanban/model';
import { KanbanBoardService } from './kanban/kanban-board.service';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'my-app',
    templateUrl: `./app.component.html`
})
export class AppComponent {
    lanes$: Observable<Lane[]>;

    constructor(private kanbanBoardService: KanbanBoardService) {}

    ngOnInit() {
        this.lanes$ = this.kanbanBoardService.lanes;
        this.kanbanBoardService.load();
    }

    onLaneMoved(event: { fromIndex: number, toIndex: number }) {
        this.kanbanBoardService.moveLane(event.fromIndex, event.toIndex);
    }

    onLaneEdited(event: { id: string, name: string, editing: boolean }) {
        this.kanbanBoardService.editLane(event);
    }

    onNoteCreated(id: string) {
        this.kanbanBoardService.attachNote(id)
    }

    onNoteEdited(event: { laneId: string, id: string, text: string, editing: boolean }) {
        this.kanbanBoardService.editNote(event);
    }

    onNoteMoved(event: { fromLaneId: string, fromIndex: number, toLaneId: string, toIndex?: number }) {
        this.kanbanBoardService.moveNote(event);
    }

    onNoteDeleted(event: { laneId: string, id: string }) {
        this.kanbanBoardService.deleteNote(event);
    }

    onNotesStatusChanged(event: { laneId: string, id: string, status: any}) {
        this.kanbanBoardService.changeNoteStatus(event);
    }

    reset() {
        this.kanbanBoardService.reset();
    }
}
