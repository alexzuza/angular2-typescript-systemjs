import { Component, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, NgZone, AfterViewChecked } from '@angular/core';

import { toggleClass } from './shared/utils';
import { Logger } from 'src/core/logger';

@Component({
  selector: 'comp1',
  template: `
    <span (click)="0">1</span>
    <ul>
      <li>
        <comp2></comp2>
      </li>
      <li>
        <comp3></comp3>
      </li>
      <li>
        <comp4></comp4>
      </li>
    </ul>
  `
})
export class Comp1Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
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
export class Comp2Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp3',
  template: `
    <span class="on-push" (click)="0">3</span>
    <ul>
      <li>
        <comp7></comp7>
      </li>
      <li>
        <comp8></comp8>         
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp3Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp4',
  template: `
    <span (click)="0">4</span>
    <ul>
      <li><comp9></comp9></li>
      <li><comp10></comp10></li>
      <li>
        <comp11></comp11>
      </li>
    </ul>
  `
})
export class Comp4Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}


@Component({
  selector: 'comp5',
  template: `<span (click)="0">5</span>`
})
export class Comp5Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp6',
  template: `<span (click)="0">6</span>`
})
export class Comp6Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}



@Component({
  selector: 'comp7',
  template: `
      <span class="on-push" (click)="0">7</span>
      <ul>
        <li><comp12></comp12></li>
        <li><comp13></comp13></li>
      </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Comp7Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp8',
  template: `<span (click)="0">8</span>`
})
export class Comp8Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp9',
  template: `<span (click)="0">9</span>`
})
export class Comp9Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp10',
  template: `<span (click)="0">10</span>`
})
export class Comp10Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp11',
  template: `
    <span>11</span>
    <ul>
      <li><comp14></comp14></li>
      <li><comp15></comp15></li>
    </ul>
  `
})
export class Comp11Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp12',
  template: `<span (click)="0">12</span>
  
    <ul>
      <li><comp16></comp16></li>
      <li><comp17></comp17></li>
    </ul>
    `
})
export class Comp12Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp13',
  template: `
    <span (click)="0">13</span>
  `
})
export class Comp13Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp14',
  template: `<span (click)="0">14</span>`
})
export class Comp14Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp15',
  template: `<span (click)="0">15</span>`
})
export class Comp15Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp16',
  template: `<span (click)="0">16</span>`
})
export class Comp16Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
  }
}

@Component({
  selector: 'comp17',
  template: `<span (click)="0">17</span>`
})
export class Comp17Component implements AfterViewChecked {
  constructor(
    private elRef: ElementRef, 
    private zone: NgZone) { }
  
  ngAfterViewChecked() {
    toggleClass(this.elRef, this.zone);
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