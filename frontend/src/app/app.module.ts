//import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { SigninModule } from './signin/signin.module';
import { httpInterceptorProviders } from './shared/auth/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const LOCALE = 'pt-BR';
registerLocaleData(localePt, LOCALE);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    //BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    SigninModule,
    AppRoutingModule
  ],
  providers: [
    { 
      provide: LOCALE_ID, 
      useValue: LOCALE 
    },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
