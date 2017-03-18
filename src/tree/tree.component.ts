import { Component } from '@angular/core';


@Component({
  selector: 'my-tree',
  template: `
      my-tree <button (click)="0">Run change detection</button>
      <hr>
      <comp1></comp1>
      <comp4></comp4> 
  `
})
export class TreeComponent {}