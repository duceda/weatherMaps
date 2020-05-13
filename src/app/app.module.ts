import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartTemperatureComponent } from './components/chart-temperature/chart-temperature.component';
import { ForecastViewerComponent } from './components/forecast-viewer/forecast-viewer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { Map1Component } from './pages/map1/map1.component';
import { Map2Component } from './pages/map2/map2.component';
import { Map3Component } from './pages/map3/map3.component';
import { Map4Component } from './pages/map4/map4.component';

@NgModule({
  declarations: [
    AppComponent,
    Map1Component,
    Map2Component,
    Map3Component,
    TabsComponent,
    Map4Component,
    ForecastViewerComponent,
    ChartTemperatureComponent
  ],
  imports: [
    BrowserModule,
    MatGridListModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    NoopAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
