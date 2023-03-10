import { CreditLoanComponent } from './../credit-loan/credit-loan.component';
import { ReadMoreComponent } from './ui-elements/read-more/read-more.component';
import { LoadingModule } from './../helpers/loading/loading.module';
import { ModalModule } from './../helpers/modal/modal.module';
import { FormatFileSizePipe } from './pipes/format-file-size.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { MissingDataModule } from '../helpers/missing-data/missing-data.module';

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
    ReadMoreComponent,
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
    HttpClientModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ModalModule,
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
    LoadingModule,
    AngularMultiSelectModule,
    ReadMoreComponent,
    MissingDataModule,
  ],
})
export class SharedModule {}
