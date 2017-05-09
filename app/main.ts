import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

import { downgradeComponent } from '@angular/upgrade/static';

declare var angular: angular.IAngularStatic;
let myApp = angular.module('mainApp', [])
  .directive(
    'appComponent',
    downgradeComponent({component: AppComponent}) as angular.IDirectiveFactory
  );
myApp.controller('MainCtrl', function() {
  this.message = 'Upgrade angularjs to angular'
});

platformBrowserDynamic().bootstrapModule(AppModule).then(platformRef => {
  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['mainApp']);
});
