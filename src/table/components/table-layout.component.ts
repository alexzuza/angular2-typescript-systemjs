import { Component } from '@angular/core';


import { Photo } from '../models/photo';
import { PhotoService } from '../services/photos.service';


@Component({
  selector: 'my-table',
  templateUrl: `src/table/components/table-layout.component.html`,
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