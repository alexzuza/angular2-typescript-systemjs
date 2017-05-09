import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  imports:      [ BrowserModule, UpgradeModule ],
  declarations: [ AppComponent ],
  entryComponents:    [ AppComponent ]
})
export class AppModule {
  ngDoBootstrap() {}
}
