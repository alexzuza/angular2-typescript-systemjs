import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, NgZone, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { toggleClass } from 'app/services/toggle-class.service';

@Component({
  selector: 'on-push-cd-observables',
  template: `
    <h2>OnPush Change Detection (Observables)</h2>
    <p>This demo shows how Angular performs change detection only for a path when Observables are used.</p>

    <ol class="list">
      <li>Bootstrapped app, performs CD everywhere</li>
      <li>Click "Trigger CD" button, skips "Comp1" subtree</li>
      <li>Click "Push to Comp17", performs CD only on path from root to Comp17</li>
      <li>Click "Comp7", skips subtrees of "Comp6", "Comp5", "Comp8" and performs CD on path from root to Comp17</li>
    </ol>

    <div>
      <button class="trigger" (click)="null">Trigger Change Detection</button>
      <button class="trigger" (click)="emitAndTriggerChangeDetection()">Push to Comp17</button>
    </div>
    <div class="tree">
      <ul>
        <li>
          <observable1 [model]="model"></observable1>
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 5em; clear: both;"></div>
  `
})
export class OnPushChangeDetectionObservablesComponent {
  model: Subject<any> = new Subject();

  emitAndTriggerChangeDetection() {
    this.model.next(null);
  }
}

class ToggleClass {
  constructor(protected zone: NgZone, protected el: ElementRef) { }

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}

@Component({
  selector: 'observable1',
  template: `
    <a class="on-push">Comp1</a>
    <ul>
      <li><observable2 [model]="model"></observable2></li>
      <li><observable3 [model]="model"></observable3></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable1 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable2',
  template: `
    <a class="on-push">Comp2</a>
    <ul>
      <li><observable4 [model]="model"></observable4></li>
      <li><observable5></observable5></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable2 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}


@Component({
  selector: 'observable3',
  template: `
    <a class="on-push">Comp3</a>
    <ul>
      <li><observable6></observable6></li>
      <li><observable7 [model]="model"></observable7></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable3 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable4',
  template: `
    <a class="on-push">Comp4</a>
    <ul>
      <li><observable8></observable8></li>
      <li><observable9 [model]="model"></observable9></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable4 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable5',
  template: `
    <a class="on-push">Comp5</a>
    <ul>
      <li><observable10></observable10></li>
      <li><observable11></observable11></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable5 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable6',
  template: `
    <a class="on-push">Comp6</a>
    <ul>
      <li><observable12></observable12></li>
      <li><observable13></observable13></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable6 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable7',
  host: { '(click)':'emitAndTriggerChangeDetection()' },
  template: `
    <a class="on-push click-me">Comp7</a>
    <ul>
      <li><observable14></observable14></li>
      <li><observable15></observable15></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable7 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }

  emitAndTriggerChangeDetection() {
    this.model.next(null);
  }
}

@Component({
  selector: 'observable8',
  template: `
    <a class="on-push">Comp8</a>
    <ul>
      <li><observable16></observable16></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable8 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable9',
  template: `
    <a class="on-push">Comp9</a>

    <ul>
      <li><observable17 [model]="model"></observable17></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable9 extends ToggleClass {
  @Input() model: Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable10',
  template: `<a class="on-push">Comp10</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable10 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable11',
  template: `<a class="on-push">Comp11</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable11 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable12',
  template: `<a class="on-push">Comp12</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable12 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable13',
  template: `<a class="on-push">Comp13</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable13 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable14',
  template: `<a class="on-push">Comp14</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable14 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable15',
  template: `<a class="on-push">Comp15</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable15 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable16',
  template: `<a class="on-push">Comp16</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable16 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'observable17',
  template: `<a class="on-push subscriber">Cmp17</a>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Observable17 extends ToggleClass {
  @Input() model:Subject<any>;

  constructor(zone: NgZone, el: ElementRef, private cd: ChangeDetectorRef) {
    super(zone, el);
  }

  ngOnInit() {
    this.model.subscribe(() => {
      this.cd.markForCheck();
      toggleClass(this.el, this.zone, 'checked-observable');
    })
  }
}

export const observableComponents = [
  Observable1,
  Observable2,
  Observable3,
  Observable4,
  Observable5,
  Observable6,
  Observable7,
  Observable8,
  Observable9,
  Observable10,
  Observable11,
  Observable12,
  Observable13,
  Observable14,
  Observable15,
  Observable16,
  Observable17
];