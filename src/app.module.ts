import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { TreeModule } from './tree/tree.module';
import { TableModule } from './table/table.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    AppRoutingModule,
    TreeModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }