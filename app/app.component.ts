import { Component, ViewChild, forwardRef } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'my-app',
  template: `
    <header class="top">
      <h1 class="site-title">Investigation ng2 Change Detection</h1>
      <div class="nav">
        <a [routerLink]="['/default-change-detection']" routerLinkActive="active" class="nav-item" >Default Change Detection</a>
        <a [routerLink]="['/on-push-change-detection']" routerLinkActive="active" class="nav-item" >OnPush Change Detection</a>
        <a [routerLink]="['/on-push-change-detection-observables']" routerLinkActive="active" class="nav-item" >OnPush Change Detection (Observables)</a>
        <a [routerLink]="['/manual-change-detection']" routerLinkActive="active" class="nav-item" >Manual Change Detection</a>
      </div>
    </header>
     
    <main class="body">
        <router-outlet></router-outlet>
    </main>

    <footer class="bottom">
      Footer
    </footer>
  `
})
export class AppComponent {
  ngOnChange() {

  }

  ngOnInit() {
    console.log('App component ngOnInit');
  }

}