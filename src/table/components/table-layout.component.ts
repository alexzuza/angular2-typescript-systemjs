import { Component, Pipe, PipeTransform } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Photo } from '../models/photo';
import { PhotoService } from '../services/photos.service';


@Component({
  selector: 'my-table',
  template: `
    <h2>A Table of Data</h2>
    <datatable  [dataset]="photoData | pager: currentPage: pageSize">
        <column value="id" header="ID"></column>
        <column value="title" header="Title">
            <ng-template #tableHeaderTemplate let-column>
                <span>{{ column.header }}</span>
            </ng-template>
        </column>
        <column value="url" header="Image">
            <ng-template #tableBodyTemplate let-row="row">
                <div class="center">
                  <img [src]="'http://artist63.ru/' + row.url" height="150">
                </div>
            </ng-template>
        </column>
        <column value="title" header="Actions">
          <ng-template #tableBodyTemplate let-column let-row="row">
              <button (click)="remove(row.id)">Remove {{row.id}}</button>
          </ng-template>
        </column>
    </datatable>
    <my-pagination [(currentPage)]="currentPage" [total]="photoData?.length" [(pageSize)]="pageSize" (pageSizeChange)="currentPage = 1"></my-pagination>
  `,
  providers: [PhotoService]
})
export class TableLayoutComponent {
  photoData: Photo[];

  currentPage: number = 1;

  pageSize: number = 3;

  constructor(private photoService: PhotoService) {

  }

  ngOnInit() {
    this.photoService.getPhotos().subscribe(data => {
      this.photoData = data;
    });
  }

  remove(id) {
    this.photoData = this.photoData.filter(x => x.id != id);
  }
}