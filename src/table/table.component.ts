import { Component } from '@angular/core';
import { Photo } from './models/photo.model';


@Component({
  selector: 'my-table',
  template: `
    <h2>A Table of Data</h2>
    <datatable  [dataset]="photoData">
        <column [value]="'id'" [header]="'ID'"></column>
        <column [value]="'title'" [header]="'Title'">
            <ng-template #tableHeaderTemplate let-column>
                <span style="color: red">{{ column.header }}</span>
            </ng-template>
        </column>
        <column [value]="'title'" [header]="'Actions'">
          <ng-template #tableBodyTemplate let-column let-row="row">
              <button (click)="remove(row.id)">Remove {{row.id}}</button>
          </ng-template>
        </column>
    </datatable>
  `
})
export class TableComponent {
  photoData: Photo[];

  constructor() {

    this.photoData = [
      new Photo("1", "My title"),
      new Photo("2", "Another Title"),
      new Photo("3", "Best Title")
    ];
  }

  remove(id) {
    this.photoData = this.photoData.filter(x => x.id != id);
  }
}