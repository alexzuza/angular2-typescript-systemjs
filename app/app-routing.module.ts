import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DefaultChangeDetectionComponent } from './pages/default/default-change-detection.component';
import { ManualChangeDetectionComponent } from './pages/manual/manual-change-detection.component';
import { OnPushChangeDetectionComponent } from './pages/on-push/on-push-change-detection.component';
import { OnPushChangeDetectionObservablesComponent } from './pages/on-push-observables/on-push-change-detection-observables.component';

import { AuthGuard } from './secure/auth-guard.service';

const appRoutes: Routes = [
  { path: 'default-change-detection', component: DefaultChangeDetectionComponent },
  { path: 'on-push-change-detection', component: OnPushChangeDetectionComponent },
  { path: 'on-push-change-detection-observables', component: OnPushChangeDetectionObservablesComponent },
  { path: 'manual-change-detection', component: ManualChangeDetectionComponent },
  { path: '', redirectTo: '/default-change-detection', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
