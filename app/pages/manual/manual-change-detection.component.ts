import { Component, ChangeDetectorRef, forwardRef, Inject, ChangeDetectionStrategy, Input, NgZone, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { toggleClass } from 'app/services/toggle-class.service';

@Component({
  selector: 'manual-cd',
  template: `
    <h2>Manual Change Detection</h2>
    <p>This demo shows how a change detector is detached from the change detector tree
    and performes change detection manually.</p>


    <ol class="list">
      <li>The app is bootstrapped (reload browser to double-check)</li>
      <li>Click "Trigger CD", skips Comp2 and Comp6 subtrees</li>
      <li>Attach cdRef, performs CD everywhere (onPush component is getting input changes)</li>
      <li>Click "Trigger CD", skips Comp2 subtree</li>
    </ol>

    <div>
      <button (click)="null">Trigger Change Detection</button>
      <label for="toggle">
        <input id="toggle" #attach type="checkbox" (click)="attachOrDetachChangeDetector(attach.checked)">
        Attach/Detach Change Detector
      </label>
    </div>
    <div class="tree">
      <ul>
        <li>
          <manual1 [notifier]="attachOrDetachNotifier"></manual1>
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 5em; clear: both;"></div>
  `
})
export class ManualChangeDetectionComponent {
  attachOrDetachNotifier:Subject<any> = new Subject();

  attachOrDetachChangeDetector(attach) {
    this.attachOrDetachNotifier.next(attach);
  }
}

class ToggleClass {
  constructor(protected zone: NgZone, protected el: ElementRef) { }

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}

@Component({
  selector: 'manual1',
  template: `
    <a>Comp1</a>
    <ul>
      <li><manual2 [notifier]="notifier"></manual2></li>
      <li><manual3></manual3></li>
    </ul>
  `
})
export class Manual1 extends ToggleClass {

  @Input() notifier:Subject<any>;

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual2',
  template: `
    <a class="detached on-push">Comp2</a>
    <ul>
      <li><manual4></manual4></li>
      <li><manual5></manual5></li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Manual2 extends ToggleClass {

  @Input() notifier:Subject<any>;
  
  constructor(zone: NgZone, el: ElementRef, private cd: ChangeDetectorRef) {
    super(zone, el);
  }

  ngOnInit() {
    this.cd.detach();

    this.notifier.subscribe((attach) => {
      if (attach) {
        this.el.nativeElement.querySelector('a').classList.remove('detached');
        this.cd.reattach();
      } else {
        this.el.nativeElement.querySelector('a').classList.add('detached');
        this.cd.detach();
      }
    });
  }
}

@Component({
  selector: 'manual3',
  template: `
    <a>Comp3</a>
    <ul>
      <li><manual6></manual6></li>
      <li><manual7></manual7></li>
    </ul>
  `
})
export class Manual3 extends ToggleClass {

  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}


@Component({
  selector: 'manual4',
  template: `
    <a>Comp4</a>
    <ul>
      <li><manual8></manual8></li>
      <li><manual9></manual9></li>
    </ul>
  `
})
export class Manual4 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }

  triggerChangeDetection () { }
}

@Component({
  selector: 'manual5',
  template: `
    <a>Comp5</a>
    <ul>
      <li><manual10></manual10></li>
      <li><manual11></manual11></li>
    </ul>
  `
})
export class Manual5 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual6',
  template: `
    <a class="detached">Comp6</a>
    <ul>
      <li><manual12></manual12></li>
      <li><manual13></manual13></li>
    </ul>
  `
})
export class Manual6 extends ToggleClass {
  
  constructor(
    zone: NgZone, el: 
    ElementRef, private cd: ChangeDetectorRef, 
    @Inject(forwardRef(() => ManualChangeDetectionComponent)) private parentComp: ManualChangeDetectionComponent) {
    super(zone, el);
  }

  ngOnInit() {
    this.cd.detach();

    this.parentComp.attachOrDetachNotifier.subscribe((attach) => {
      if (attach) {
        this.el.nativeElement.querySelector('a').classList.remove('detached');
        this.cd.reattach();
      } else {
        this.el.nativeElement.querySelector('a').classList.add('detached');
        this.cd.detach();
      }
    });
  }
}

@Component({
  selector: 'manual7',
  template: `
    <a>Comp7</a>
    <ul>
      <li><manual14></manual14></li>
      <li><manual15></manual15></li>
    </ul>
  `
})
export class Manual7 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}



@Component({
  selector: 'manual8',
  template: `
    <a>Comp8</a>
    <ul>
      <li><manual16></manual16></li>
    </ul>
  `
})
export class Manual8 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}


@Component({
  selector: 'manual9',
  template: `
    <a>Comp9</a>
    <ul>
      <li><manual17></manual17></li>
    </ul>
  `
})
export class Manual9 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual10',
  template: `<a>Comp10</a>`
})
export class Manual10 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual11',
  template: `<a>Comp11</a>`
})
export class Manual11 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual12',
  template: `<a>Comp12</a>`
})
export class Manual12 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual13',
  template: `<a>Comp13</a>`
})
export class Manual13 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual14',
  template: `<a>Comp14</a>`
})
export class Manual14 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual15',
  template: `<a>Comp15</a>`
})
export class Manual15 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual16',
  template: `<a>Comp16</a>`
})
export class Manual16 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

@Component({
  selector: 'manual17',
  template: `<a>Comp17</a>`
})
export class Manual17 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) {
    super(zone, el);
  }
}

export const manualComponents = [
  Manual1,
  Manual2,
  Manual3,
  Manual4,
  Manual5,
  Manual6,
  Manual7,
  Manual8,
  Manual9,
  Manual10,
  Manual11,
  Manual12,
  Manual13,
  Manual14,
  Manual15,
  Manual16,
  Manual17
];