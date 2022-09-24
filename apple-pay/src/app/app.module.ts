import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GooglePayButtonModule } from '@google-pay/button-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplePayComponent } from './apple-pay/apple-pay.component';
import { GooglePayComponent } from './google-pay/google-pay.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ApplePayComponent,
    GooglePayComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GooglePayButtonModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
