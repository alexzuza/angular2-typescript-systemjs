import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Photo } from '../models/photo';

@Injectable()
export class PhotoService {

  constructor(private http: Http) { }

  getPhotos(): Observable<Photo[]> {
    return this.http.get('src/table/models/photos.json')
      .map((res: Response) => {
          return res.json() || [];
      })
  }

}