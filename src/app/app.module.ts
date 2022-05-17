import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from './material-module';
import { ResizeColumnDirective } from './resize-column.directive';

@NgModule({
  declarations: [
    AppComponent,
    ResizeColumnDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DemoMaterialModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
