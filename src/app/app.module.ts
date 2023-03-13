import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { AppInjector } from './shared/services';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LeftmenuComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, DashboardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.injector = injector;
  }
}
