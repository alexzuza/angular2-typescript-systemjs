import { Component, TemplateRef, ContentChild, Input } from '@angular/core';
import { DataTableComponent } from './datatable.component';

@Component({
  selector: 'column',
  template: ``
})
export class ColumnComponent {
  @Input() value: string;
  @Input() header: string;
    
  @ContentChild('tableHeaderTemplate') headerTemplate: TemplateRef<any>;
  @ContentChild('tableBodyTemplate') bodyTemplate: TemplateRef<any>;

  constructor(public table: DataTableComponent) {
      table.addColumn(this);
	}

}