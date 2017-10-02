import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/*import { MdButtonModule, MdOptionModule, MdSelectModule } from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';*/
import { AppComponent }  from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    // MdButtonModule, MdOptionModule, MdSelectModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

