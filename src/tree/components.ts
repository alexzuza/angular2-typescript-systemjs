import { Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, DoCheck } from '@angular/core';

import { toggleClass } from './shared/utils';
import { Logger } from 'src/core/logger';


export abstract class SomeComponent implements DoCheck {
  constructor(private elRef: ElementRef, private zone: NgZone) { }

  ngDoCheck() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp1',
  template: `
    <span (click)="0">1</span>
    <ul>
      <li><comp2></comp2></li>
      <li><comp3></comp3></li>
      <li><comp4></comp4></li>
    </ul>
  `
})
export class Comp1Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp2',
  template: `
      <span (click)="0">2</span>
      <ul>
        <li><comp5></comp5></li>
        <li><comp6></comp6></li>
      </ul>
  `
})
export class Comp2Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp3',
  template: `
    <span class="on-push" (click)="0">3</span>
    <ul>
      <li><comp7></comp7></li>
      <li><comp8></comp8></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp3Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp4',
  template: `
    <span (click)="0">4</span>
    <ul>
      <li><comp13></comp13></li>
      <li><comp14></comp14></li>
      <li><comp15></comp15></li>
    </ul>
  `
})
export class Comp4Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp5',
  template: `<span (click)="0">5</span>`
})
export class Comp5Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp6',
  template: `<span (click)="0">6</span>`
})
export class Comp6Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp7',
  template: `
      <span class="on-push" (click)="0">7</span>
      <ul>
        <li><comp9></comp9></li>
        <li><comp10></comp10></li>
      </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp7Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp8',
  template: `<span (click)="0">8</span>`
})
export class Comp8Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp9',
  template: `<span (click)="0">9</span>
    <ul>
      <li><comp11></comp11></li>
      <li><comp12></comp12></li>
    </ul>
    `
})
export class Comp9Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp10',
  template: `<span (click)="0">10</span>`
})
export class Comp10Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp11',
  template: `<span (click)="0">11</span>`
})
export class Comp11Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp12',
  template: `<span (click)="0">12</span>`
})
export class Comp12Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}


@Component({
  selector: 'comp13',
  template: `<span (click)="0">13</span>`
})
export class Comp13Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp14',
  template: `<span (click)="0">14</span>`
})
export class Comp14Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}


@Component({
  selector: 'comp15',
  template: `
    <span>15</span>
    <ul>
      <li><comp16></comp16></li>
      <li><comp17></comp17></li>
    </ul>
  `
})
export class Comp15Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

@Component({
  selector: 'comp16',
  template: `<span (click)="0">16</span>`
})
export class Comp16Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}


@Component({
  selector: 'comp17',
  template: `<span (click)="0">17</span>`
})
export class Comp17Component extends SomeComponent {
  constructor(elRef: ElementRef, zone: NgZone) {
    super(elRef, zone);
  }
}

export const components = [
  Comp1Component,
  Comp2Component,
  Comp3Component,
  Comp4Component,
  Comp5Component,
  Comp6Component,
  Comp7Component,
  Comp8Component,
  Comp9Component,
  Comp10Component,
  Comp11Component,
  Comp12Component,
  Comp13Component,
  Comp14Component,
  Comp15Component,
  Comp16Component,
  Comp17Component
];