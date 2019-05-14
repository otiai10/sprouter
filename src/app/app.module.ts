import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { EntriesComponent } from './components/entries/entries.component';
import { InspectComponent } from './components/inspect/inspect.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    EntriesComponent,
    InspectComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
