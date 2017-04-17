import { Component, Input } from '@angular/core';
import { ColumnComponent } from './column.component';

@Component({
    selector: 'datatable',
    templateUrl: `./datatable.component.html`,
    host: {
        class: 'scroll'
    }
})
export class DataTableComponent {

    @Input() dataset: any;

    columns: ColumnComponent[] = [];

    editingCell: any;

    addColumn(column) {
        this.columns.push(column);
    }

    toggleEditing(cell: HTMLElement, column: ColumnComponent) {
        if(column.editable) {
            this.editingCell = cell;
            setTimeout(() => {
                cell.querySelector('input').focus();
            }, 100);
        }

    }

}