

export enum NoteStatus {
    InProgress,
    Overdue,
    Completed
}

export class Note {
  id: string;
  editing: boolean;
  text: string;
  status: NoteStatus
}

export interface Lane {
  id: string;
  name: string;
  editing: boolean;
  notes: Note[];
}
