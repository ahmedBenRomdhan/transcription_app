import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranscriberComponent } from './transcriber/transcriber.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from './highlight/highlight.module';

@NgModule({
  declarations: [
    AppComponent,
    TranscriberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighlightModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
