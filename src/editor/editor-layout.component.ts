import { Component } from '@angular/core';

@Component({
    selector: 'my-editor-layout',
    template: `
        <h1>WYSIWYG example</h1>
        <wysiwyg-editor [(ngModel)]="content"></wysiwyg-editor>
        <p>
            {{ content }}
        </p>
    `
})
export class EditorLayoutComponent {
    content = '<h2>hello</h2>';
}