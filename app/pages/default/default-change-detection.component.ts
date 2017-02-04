import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { toggleClass } from 'app/services/toggle-class.service';

@Component({
  selector: 'default-change-detection-component',
  template:  `
    <h2>Default Change Detection</h2>
    <p>This demo shows how change detection is performed for each component after every VM turn. <br>All components should light
      up when:</p>

    <ol class="list">
      <li>The app is bootstrapped (reload browser to double-check)</li>
      <li>Click "Trigger CD", performs CD everywhere</li>
    </ol>

    <div>
      <button (click)="null">Trigger Change Detection</button>
    </div>
    <div class="tree">
      <ul>
        <li>
          <default1></default1>
        </li>
      </ul>
    </div>
    <div style="margin-bottom: 5em; clear: both;"></div>
  `,
  providers: []
})
export class DefaultChangeDetectionComponent {}


class ToggleClass {
  constructor(private zone: NgZone, private el: ElementRef) { }

  ngAfterViewChecked() {
    toggleClass(this.el, this.zone);
  }
}

@Component({
  selector: 'default1',
  template: `
    <a>Comp1</a>
    <ul>
      <li><default2></default2></li>
      <li><default3></default3></li>
    </ul>
  `
})
export class Default1 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}


@Component({
  selector: 'default2',
  template: `
    <a>Comp2</a>
    <ul>
      <li><default4></default4></li>
      <li><default5></default5></li>
    </ul>
  `
})
export class Default2 extends ToggleClass {
  constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}

@Component({
  selector: 'default3',
  template: `
    <a>Comp3</a>
    <ul>
      <li><default6></default6></li>
      <li><default7></default7></li>
    </ul>
  `
})
export class Default3 extends ToggleClass {
   constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}

@Component({
  selector: 'default4',
  template: '<a>Comp4</a>'
})
export class Default4 extends ToggleClass {
 constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}

@Component({
  selector: 'default5',
  template: '<a>Comp5</a>'
})
export class Default5 extends ToggleClass {
 constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}

@Component({
  selector: 'default6',
  template: '<a>Comp6</a>'
})
export class Default6 extends ToggleClass {
 constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}

@Component({
  selector: 'default7',
  template: '<a>Comp7</a>'
})
export class Default7 extends ToggleClass {
 constructor(zone: NgZone, el: ElementRef) { 
    super(zone, el);
  }
}


export const defaultComponents = [
  Default1,
  Default2,
  Default3,
  Default4,
  Default5,
  Default6,
  Default7
];