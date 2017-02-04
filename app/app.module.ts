import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { DefaultChangeDetectionComponent, defaultComponents } from './pages/default/default-change-detection.component';
import { ManualChangeDetectionComponent, manualComponents } from './pages/manual/manual-change-detection.component';
import { OnPushChangeDetectionComponent, onPushComponents } from './pages/on-push/on-push-change-detection.component';
import { OnPushChangeDetectionObservablesComponent, observableComponents } from './pages/on-push-observables/on-push-change-detection-observables.component';

import { NotFoundComponent }    from './pages/not-found/not-found.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    AppRoutingModule 
  ],
  declarations: [ 
    AppComponent,
    DefaultChangeDetectionComponent,
    defaultComponents,

    ManualChangeDetectionComponent,
    manualComponents,

    OnPushChangeDetectionComponent, 
    onPushComponents,

    OnPushChangeDetectionObservablesComponent, 
    observableComponents,
    
    NotFoundComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }