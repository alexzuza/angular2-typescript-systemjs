import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanComponent } from './kanban.component';
import { LaneComponent } from './lane.component';
import { EditableComponent } from './editable.component';
import { NotesComponent } from './notes.component';
import { DragulaDirective } from './dragula.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        KanbanComponent,
        LaneComponent,
        EditableComponent,
        NotesComponent,
        DragulaDirective
    ],
    exports: [KanbanComponent]
})
export class KanbanModule {
}
