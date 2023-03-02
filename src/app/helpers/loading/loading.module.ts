import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [LoadingComponent, PageLoadingComponent],
  imports: [CommonModule],
  exports: [LoadingComponent, PageLoadingComponent],
})
export class LoadingModule {}
