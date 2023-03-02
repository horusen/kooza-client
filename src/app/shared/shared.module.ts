import { LoadingModule } from './../helpers/loading/loading.module';
import { ModalModule } from './../helpers/modal/modal.module';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UploaderModule } from 'angular-uploader';

import {
  ShortenPipe,
  CapitalizeFirstPipe,
  SlugifyPipe,
  ReplaceBarPipe,
  ShortNumberPipe,
  RemoveBarPipe,
  SearchFilterPipe,
  FichierTypeFilterPipe,
  CountPipe,
  SelectedSortPipe,
} from './pipes';
import { CallbackPipe } from './pipes/callback.pipe';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

@NgModule({
  declarations: [
    ShortenPipe,
    CapitalizeFirstPipe,
    SlugifyPipe,
    ReplaceBarPipe,
    RemoveBarPipe,
    ShortNumberPipe,
    CallbackPipe,
    FormatFileSizePipe,
    SearchFilterPipe,
    FichierTypeFilterPipe,
    CountPipe,
    SelectedSortPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
    UploaderModule,
    LoadingModule,
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShortenPipe,
    CapitalizeFirstPipe,
    SlugifyPipe,
    ReplaceBarPipe,
    ShortNumberPipe,
    RemoveBarPipe,
    RouterModule,
    CallbackPipe,
    FormatFileSizePipe,
    SearchFilterPipe,
    FichierTypeFilterPipe,
    CountPipe,
    SelectedSortPipe,
    ModalModule,
    UploaderModule,
    LoadingModule,
  ],
})
export class SharedModule {}
