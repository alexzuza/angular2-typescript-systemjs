import { NgModule } from '@angular/core';

import { PagerPipe } from './pipes/pager.pipe';

@NgModule({ 
  declarations: [
    PagerPipe
  ],
  exports: [
    PagerPipe
  ]
})
export class ShareModule {}