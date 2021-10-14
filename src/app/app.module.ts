import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './interceptors/curl.interceptor';
import {NgxChildProcessModule} from 'ngx-childprocess';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxChildProcessModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
