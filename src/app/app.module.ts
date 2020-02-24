import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MonkeyChartsModule } from '../../projects/monkey-charts/src/lib/monkey-charts.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MonkeyChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
