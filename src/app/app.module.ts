import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { PrecipitationComponent } from './components/precipitation/precipitation.component';
import { GraphComponent } from './components/graph/graph.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphBoxComponent } from './components/graph-box/graph-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DropdownMenuComponent,
    GraphComponent,
    PrecipitationComponent,
    TemperatureComponent,
    GraphBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
