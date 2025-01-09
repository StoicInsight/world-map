import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CountryComponent } from './country/country.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: '/map', pathMatch: 'full' },
      { path: 'map', component: MapComponent },
      { path: 'country', component: CountryComponent },
    ],
  },
];
