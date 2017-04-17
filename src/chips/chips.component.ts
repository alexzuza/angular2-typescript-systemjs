import { Component } from '@angular/core';


@Component({
    selector: 'my-chips',
    templateUrl: `./chips.component.html`
})
export class ChipsComponent {
    tags: string[] = [];

    focused: boolean = false;

    onKeydown(tokenInput: HTMLInputElement): void {
        let value = tokenInput.value;
        if (value && value.trim().length && !this.tags.find(x => x == value)) {
            this.tags.push(value);
        }
        tokenInput.value = '';
    }

    removeTag(i: any) {
        this.tags.splice(i, 1);
    }
}