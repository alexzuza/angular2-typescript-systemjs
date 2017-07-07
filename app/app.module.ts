import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { KanbanModule } from './kanban/kanban.module';
import { KanbanBoardService } from './kanban/kanban-board.service';

@NgModule({
  imports: [
    BrowserModule, KanbanModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [KanbanBoardService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
