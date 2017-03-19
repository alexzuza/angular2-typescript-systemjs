import { Component, Input } from '@angular/core';
import { ColumnComponent } from './column.component';

@Component({
  selector: 'datatable',
  template: `
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th *ngFor="let column of columns">
                <ng-container *ngIf="!column.headerTemplate">{{column.header}}</ng-container> 
                <ng-template *ngIf="column.headerTemplate" 
                  [ngTemplateOutlet]="column.headerTemplate" 
                  [ngOutletContext]="{ $implicit: { header: column.header } }"></ng-template>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of dataset; let i = index">
              <td *ngFor="let column of columns">
                <ng-container *ngIf="!column.bodyTemplate">{{row[column.value]}}</ng-container> 
                <ng-template *ngIf="column.bodyTemplate" 
                  [ngTemplateOutlet]="column.bodyTemplate" 
                  [ngOutletContext]="{ $implicit: { value: row[column.value] }, row: row }"></ng-template>
              </td>
            </tr>
          </tbody>
      </table>
    
    `
})
export class DataTableComponent {

  @Input() dataset;

  columns: ColumnComponent[] = [];

  addColumn(column) {
    this.columns.push(column);
  }

}