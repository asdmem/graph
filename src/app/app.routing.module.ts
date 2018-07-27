import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { PrecipitationComponent } from './components/precipitation/precipitation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'temperature',
    pathMatch: 'full'
  },
  {
    path: 'temperature',
    component: TemperatureComponent
  },
  {
    path: 'precipitation',
    component: PrecipitationComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
