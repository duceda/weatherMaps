import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Map1Component } from './pages/map1/map1.component';
import { Map2Component } from './pages/map2/map2.component';
import { Map3Component } from './pages/map3/map3.component';
import { Map4Component } from './pages/map4/map4.component';
import { ChartTemperatureComponent } from './components/chart-temperature/chart-temperature.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map1',
    pathMatch: 'full'
  },
  {
    path: 'map1',
    component: Map1Component
  },
  {
    path: 'map2',
    component: Map2Component
  },
  {
    path: 'map3',
    component: Map3Component
  },
  {
    path: 'forecast',
    component: Map4Component
  },
  {
    path: 'chart',
    component: ChartTemperatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
