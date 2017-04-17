import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { EditorComponent } from './editor.component';
import { ToolbarComponent } from './toolbar.component';
import { EditorLayoutComponent } from './editor-layout.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: 'editor', component: EditorLayoutComponent }
        ])
    ],
    declarations: [
        EditorLayoutComponent,
        EditorComponent,
        ToolbarComponent
    ],
    exports: [
        EditorComponent
    ]
})
export class EditorModule { }