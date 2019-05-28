import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { EntriesComponent } from './components/entries/entries.component';
import { InspectComponent } from './components/inspect/inspect.component';
import { DropComponent } from './components/form/input/drop.component';
import { ConfigComponent } from './components/form/input/config.component';

@NgModule({
  declarations: [
    AppComponent,
    DropComponent,
    ConfigComponent,
    FormComponent,
    EntriesComponent,
    InspectComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
