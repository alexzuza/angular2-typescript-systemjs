import { Component, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'my-tree',
  template: `
      <h2>Some tree</h2><button class="btn-run" (click)="0">Run change detection</button>
      <ul>
        <li>
          <comp1></comp1>
        </li>
      </ul>

  `
})
export class TreeComponent {
  
  constructor() {
    //document.addEventListener('mousemove', function(){})

  }
}