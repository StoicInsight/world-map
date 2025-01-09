import { Component, importProvidersFrom } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { CountryComponent } from './country/country.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent, CountryComponent, RouterModule],
  template: `
    <main class="main">
      <div class="world-map">
        <app-map></app-map>
      </div>
      <div class="country-data">
        <h1>Click country to see data</h1>
        <app-country></app-country>
      </div>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'world-map';
}
