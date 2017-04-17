import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'wysiwyg-toolbar',
    templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {

    @Input() buttons: any[];

    @Input() editMode: boolean;

    @Output() editModeChange: EventEmitter<boolean> = new EventEmitter();

    @Output() commandExecuted: EventEmitter<any> = new EventEmitter();

    execCommand(command: string, options: string) {
        if (this.editMode) {
            return false;
        }

        if (command === 'createlink') {
            options = window.prompt('Please enter the URL', 'http://');
            if (!options) {
                return;
            }
        }

        let selection = document.getSelection().toString();

        if (command === 'createlink' && selection === '') {
            document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
        }
        else {
            document.execCommand(command, false, options);
        }

        this.commandExecuted.emit();
    }


    isActive(command) {
        return !!command && document.queryCommandState(command);
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
        this.editModeChange.emit(this.editMode);
    }

}