import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UUID } from 'angular2-uuid';

import { Lane, Note, NoteStatus } from './model';

import * as localforage from 'localforage';


const defaultState: Lane[] = [
    {
        id: UUID.UUID(),
        name: 'Todo',
        editing: false,
        notes: [
            {
                id: UUID.UUID(),
                status: NoteStatus.InProgress,
                text: 'Navbar and Office Navigation Bar Enhancements',
                editing: false
            },
            {
                id: UUID.UUID(),
                status: NoteStatus.Overdue,
                text: 'PictureEdit - Trim Image by Mask/Shape',
                editing: false
            },
            {
                id: UUID.UUID(),
                status: NoteStatus.InProgress,
                text: 'Calendar Control - Touch Mode',
                editing: false
            }
        ]
    },
    {
        id: UUID.UUID(),
        name: 'In Progress',
        editing: false,
        notes: [
            {
                id: UUID.UUID(),
                status: NoteStatus.InProgress,
                text: 'Stub Glyphs for BarItems in Ribbon & BarManager',
                editing: false
            }
        ]
    },
    {
        id: UUID.UUID(),
        name: 'Review',
        editing: false,
        notes: []
    },
    {
        id: UUID.UUID(),
        name: 'Done',
        editing: false,
        notes: [
            {
                id: UUID.UUID(),
                status: NoteStatus.Completed,
                text: 'MVVM Core Enhancements',
                editing: false
            },
            {
                id: UUID.UUID(),
                status: NoteStatus.InProgress,
                text: 'Filtering UI Enhancements',
                editing: false
            },
            {
                id: UUID.UUID(),
                status: NoteStatus.InProgress,
                text: 'Master Detail Mode - Single Vertical Scrollbar for Multiple Views',
                editing: false
            }
        ]
    }
];

const storage: LocalForage = localforage.createInstance({
    name: 'kanban',
});


@Injectable()
export class KanbanBoardService {
    private _lanes: BehaviorSubject<Lane[]> = new BehaviorSubject([]);
    private dataStore: { lanes: Lane[] } = {lanes: []};

    get lanes(): Observable<Lane[]> {
        return this._lanes.asObservable();
    }

    load() {
        storage.getItem('state').then((data: Lane[]) => {
            this.dataStore.lanes = data || defaultState;
            this.dispatch();
        });
        this.lanes.subscribe((state) => storage.setItem('state', state));
    }

    moveLane(fromIndex: number, toIndex: number) {
        let newArr = [...this.dataStore.lanes];
        /*  let movedLane = newArr[fromIndex];
         newArr.splice(fromIndex, 1);
         newArr.splice(toIndex, 0, movedLane);
         */
        this.dataStore.lanes = newArr;
        this.dispatch();
    }

    editLane(action: EditLaneAction) {
        this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
            if (lane.id !== action.id) {
                return lane;
            }

            return Object.assign({}, lane, {
                name: action.name,
                editing: action.editing
            });
        });
        this.dispatch();
    }

    attachNote(id: string) {
        this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
            if (lane.id !== id) {
                return lane;
            }

            const note: Note = {
                id: UUID.UUID(),
                editing: true,
                text: '',
                status: NoteStatus.InProgress
            };

            return Object.assign({}, lane, {notes: [...lane.notes, note]});
        });

        this.dispatch();
    }

    editNote(action: EditNoteAction) {
        this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
            if (lane.id !== action.laneId) {
                return lane;
            }

            lane.notes = lane.notes.map(note => {
                if (note.id !== action.id) {
                    return note;
                }

                return Object.assign({}, note, {
                    text: action.text,
                    editing: action.editing
                });
            });
            return lane;
        });

        this.dispatch();
    }

    moveNote(action: MoveNoteAction) {
        if (action.fromLaneId === action.toLaneId) {
            this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
                if (lane.id !== action.fromLaneId) {
                    return lane;
                }

                let newArr = [...lane.notes];
                /*  let movedNote = newArr[action.fromIndex];
                 newArr.splice(action.fromIndex, 1);
                 newArr.splice(action.toIndex, 0, movedNote);*/

                return Object.assign({}, lane, {notes: newArr});
            });
        } else {
            let movedNote;
            this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
                if (lane.id === action.fromLaneId) {
                    let newArr = [...lane.notes];
                    // movedNote = newArr.splice(action.fromIndex, 1)[0];

                    return Object.assign({}, lane, {notes: newArr});
                }

                return lane;
            });
            this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
                if (lane.id === action.toLaneId) {
                    let newArr = [...lane.notes];
                    /* if(action.toIndex === null) {
                     newArr.push(movedNote);
                     } else {
                     newArr.splice(action.toIndex, 0, movedNote);
                     }*/

                    return Object.assign({}, lane, {notes: newArr});
                }

                return lane;
            });
        }

        this.dispatch();
    }

    deleteNote(action: DeleteNoteAction) {
        this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
            if (lane.id !== action.laneId) {
                return lane;
            }
            let newArr = lane.notes.filter(x => x.id !== action.id);

            return Object.assign({}, lane, {notes: newArr});
        });

        this.dispatch();
    }

    changeNoteStatus(action: ChangeNoteStatusAction) {
        this.dataStore.lanes = this.dataStore.lanes.map((lane: Lane) => {
            if (lane.id !== action.laneId) {
                return lane;
            }

            lane.notes = lane.notes.map(note => {
                if (note.id !== action.id) {
                    return note;
                }

                return Object.assign({}, note, {
                    status: +action.status
                });
            });
            return lane;
        });

        this.dispatch();
    }

    dispatch() {
        this._lanes.next(Object.assign({}, this.dataStore).lanes);
    }

    reset() {
        storage.clear();
        window.location.reload();
    }
}


export interface MoveLaneAction {
    fromIndex: number;
    toIndex: number;
}

export interface MoveNoteAction {
    fromLaneId: string;
    fromIndex: number;
    toLaneId: string;
    toIndex?: number
}

export interface EditLaneAction {
    id: string;
    name: string;
    editing: boolean;
}

export interface EditNoteAction {
    laneId: string;
    id: string;
    text: string;
    editing: boolean;
}

export interface DeleteNoteAction {
    laneId: string;
    id: string;
}

export interface ChangeNoteStatusAction extends DeleteNoteAction {
    status: any;
}