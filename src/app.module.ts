import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { TreeModule } from './tree/tree.module';
import { TableModule } from './table/table.module';
import { EditorModule } from './editor/editor.module';
import { TemplateDrivenFormsModule } from './template-driven-forms/template-driven-forms.module';
import { ReactiveDrivenFormsModule } from './reactive-driven-forms/reactive-driven-forms.module';

import { AppComponent } from './app.component';

import { ChipsComponent } from './chips/chips.component';
import { PageNotFoundComponent } from './page-not-found.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        CoreModule,
        AppRoutingModule,
        TreeModule,
        TableModule,
        EditorModule,
        TemplateDrivenFormsModule,
        ReactiveDrivenFormsModule
    ],
    declarations: [
        AppComponent,
        ChipsComponent,
        PageNotFoundComponent
    ],
    providers: [
        {
            provide: LocationStrategy, useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}