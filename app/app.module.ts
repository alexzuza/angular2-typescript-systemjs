import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MdButtonModule } from '@angular2-material/button';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, MdButtonModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }