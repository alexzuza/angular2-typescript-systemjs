import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TreeModule } from './tree/tree.module';
import { TableModule } from './table/table.module';

import { AppComponent } from './app.component';

import { SandBoxComponent, ChildComponent } from './sandbox/sandbox.component';
import { PageNotFoundComponent } from './page-not-found.component';


@NgModule({
  imports:      [ 
    BrowserModule,
    HttpModule,
    CoreModule,
    AppRoutingModule,
    TreeModule,
    TableModule
  ],
  declarations: [
    AppComponent,
    SandBoxComponent,
    ChildComponent,
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