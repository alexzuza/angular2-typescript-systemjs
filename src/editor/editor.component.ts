import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    forwardRef,Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

export const EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EditorComponent),
    multi: true
};

export interface ToolbarButton {
    title: string;
    command: string;
    tag: string;
    options?: any;
    active?: boolean;
}

@Component({
    selector: 'wysiwyg-editor',
    templateUrl: './editor.component.html',
    providers: [EDITOR_VALUE_ACCESSOR]
})
export class EditorComponent implements OnInit, ControlValueAccessor {

    content: string;

    @ViewChild('editor') container: ElementRef;

    toolbarButtons: ToolbarButton[] = [
        {
            title: 'bold',
            command: 'bold',
            tag: 'b'
        },
        {
            title: 'italic',
            command: 'italic',
            tag: 'i'
        },
        {
            title: 'h1',
            command: 'formatBlock',
            options: '<h1>',
            tag: 'h1'
        },
        {
            title: 'h2',
            command: 'formatBlock',
            options: '<h2>',
            tag: 'h2'
        },
        {
            title: 'link',
            command: 'createlink',
            tag: 'a'
        }
    ];

    constructor(private renderer: Renderer2) { }

    editMode: boolean = false;

    subscriptions: Subscription[] = []

    ngOnInit() {
        document.execCommand('defaultParagraphSeparator', false, 'p');
        ['mouseup', 'keydown', 'keyup'].forEach(event => {
            this.subscriptions.push(Observable
                .fromEvent(this.container.nativeElement, event)
                .debounceTime(60)
                .subscribe(e => {
                    this.refreshActiveButtons();
                }));
        });
    }

    onContentChanged() {
        this.content = this.container.nativeElement.innerHTML;
        this.propagateChange(this.content);
    }

    refreshActiveButtons() {
        const tags = this.getTagsRecursive(document.getSelection().focusNode);
        this.toolbarButtons.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1);
    }

    getTagsRecursive(element, tags?: any[]) {
        tags = tags || (element && element.tagName ? [element.tagName] : []);

        if (element && element.parentNode) {
            element = element.parentNode;
        } else {
            return tags;
        }

        const tag = element.tagName;
        if (tag === 'DIV') {
            return tags;
        }

        tags.push(tag);

        return this.getTagsRecursive(element, tags);
    }

    onBlur() {
        this.toolbarButtons.forEach(x => x.active = false);
    }

    onCommandExecuted() {
        this.onContentChanged();
        this.refreshActiveButtons()
    }

    writeValue(value: any) {
        if (value) {
            this.content = value;
            this.renderer.setProperty(this.container.nativeElement, 'innerHTML', this.content);
        }
    }

    propagateChange: any = (_: any) => { };

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched() { }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}