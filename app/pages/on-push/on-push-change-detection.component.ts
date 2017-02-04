import { Component, NgZone, ChangeDetectorRef, ChangeDetectionStrategy, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { toggleClass } from 'app/services/toggle-class.service';

@Component({
  selector: 'on-push-cd',
  template: `
    <h2>OnPush Change Detection</h2>
    <p>This demo shows how change detection skips a component's subtree when
    it's set to <code>OnPush</code> and non of its input property change or an
    event is fired inside that component.</p>

    <ol class="list">
      <li>Bootstrapped app, performs CD everywhere (reload to check)</li>
      <li>Click "Trigger CD" button, skips "Comp2" subtree</li>
      <li>Click "Comp12", skips "Comp2" subtree</li>
      <li>Click "Comp10", skips "Comp8" subtree</li>
      <li>Click "Comp16", performs CD everywhere</li>
    </ol>

    <div>
      <button class="trigger" (click)="null">Trigger Change Detection</button>
    </div>
    <div class="tree">
      <ul>
        <li>
          <onpush1></onpush1>
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 5em; clear: both;"></div>
  `
})
export class OnPushChangeDetectionComponent { }

class ToggleClass {
  constructor(protected zone: NgZone, protected el: ElementRef) { }

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}


@Component({
  selector: 'onpush1',
  template: `
    <a>Comp1</a>
    <ul>
      <li><onpush2></onpush2></li>
      <li><onpush3></onpush3></li>
    </ul>
  `
})
export class OnPush1 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush2',
  template: `
    <a class="on-push">Comp2</a>
    <ul>
      <li><onpush4></onpush4></li>
      <li><onpush5></onpush5></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPush2 {

  counter:number = 0;

  constructor(private zone: NgZone, private el: ElementRef, private cd: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}

@Component({
  selector: 'onpush3',
  template: `
    <a>Comp3</a>
    <ul>
      <li><onpush6></onpush6></li>
      <li><onpush7></onpush7></li>
    </ul>
  `
})
export class OnPush3 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush4',
  template: `
    <a>Comp4</a>
    <ul>
      <li><onpush8></onpush8></li>
      <li><onpush9></onpush9></li>
    </ul>
  `
})
export class OnPush4 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush5',
  template: `
    <a>Comp4</a>
    <ul>
      <li><onpush10></onpush10></li>
      <li><onpush11></onpush11></li>
    </ul>
  `
})
export class OnPush5 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush6',
  template: `
    <a>Comp6</a>
    <ul>
      <li><onpush12></onpush12></li>
      <li><onpush13></onpush13></li>
    </ul>
  `
})
export class OnPush6 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush7',
  template: `
    <a>Comp7</a>
    <ul>
      <li><onpush14></onpush14></li>
      <li><onpush15></onpush15></li>
    </ul>
  `
})
export class OnPush7 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush8',
  template: `
    <a class="on-push">Comp8</a>
    <ul>
      <li><onpush16></onpush16></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPush8 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush9',
  template: `
    <a>Comp9</a>
    <ul>
      <li><onpush17></onpush17></li>
    </ul>
  `
})
export class OnPush9 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush10',
  host: { '(click)': 'triggerChangeDetection()' },
  template: `<a class="click-me">Comp10</a>`
})
export class OnPush10 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }

  triggerChangeDetection () { }
}

@Component({
  selector: 'onpush11',
  template: `<a>Comp11</a>`
})
export class OnPush11 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush12',
  host: { '(click)': 'triggerChangeDetection()' },
  template: `<a class="click-me">Comp12</a>`
})
export class OnPush12 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }

  triggerChangeDetection () { }
}

@Component({
  selector: 'onpush13',
  template: `<a>Comp13</a>`
})
export class OnPush13 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush14',
  template: `<a>Comp14</a>`
})
export class OnPush14 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush15',
  template: `<a>Comp15</a>`
})
export class OnPush15 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'onpush16',
  host: { '(click)': 'triggerChangeDetection()' },
  template: `<a class="click-me">Comp16</a>`
})
export class OnPush16 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }

  triggerChangeDetection () { }
}

@Component({
  selector: 'onpush17',
  template: `<a>Comp17</a>`
})
export class OnPush17 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

export const onPushComponents = [
  OnPush1,
  OnPush2,
  OnPush3,
  OnPush4,
  OnPush5,
  OnPush6,
  OnPush7,
  OnPush8,
  OnPush9,
  OnPush10,
  OnPush11,
  OnPush12,
  OnPush13,
  OnPush14,
  OnPush15,
  OnPush16,
  OnPush17
];