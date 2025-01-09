import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WorldBankService } from '../world-bank.service';
import { CountryData } from '../country-data';
import { CountryIdService } from '../country-id.service';

@Component({
  selector: 'app-country',
  imports: [CommonModule],
  template: `
    <div *ngIf="countryData">
      <h2>{{ countryData.name }}</h2>
      <p>Capital: {{ countryData.capitalCity }}</p>
      <p>Region: {{ countryData.region }}</p>
      <p>Income Level: {{ countryData.incomeLevel }}</p>
      <p>Latitude: {{ countryData.latitude }}</p>
      <p>Longitude: {{ countryData.longitude }}</p>
    </div>
  `,
  styleUrl: './country.component.css',
})
export class CountryComponent {
  countryData: CountryData | null = null;

  constructor(
    private worldBankService: WorldBankService,
    private countryIdService: CountryIdService
  ) {}

  ngOnInit(): void {
    this.countryIdService.currentCountryId$.subscribe((id) => {
      if (id) {
        this.worldBankService.getCountry(id).subscribe((data) => {
          console.log('Country data fetched', data.incomeLevel);
          this.countryData = data;
        });
      }
    });
  }
}
