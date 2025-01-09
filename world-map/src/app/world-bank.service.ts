import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryData } from './country-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorldBankService {
  private api = 'https://api.worldbank.org/v2/country';
  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryData[]> {
    return this.http
      .get<any[]>(this.api, {
        params: {
          format: 'json',
          per_page: '100',
        },
      })
      .pipe(
        map((data: any) => {
          return (data[1] || []).map((country: any) => ({
            name: country.name,
            capitalCity: country.capitalCity,
            region: country.region.value,
            incomeLevel: country.incomeLevel.value,
            latitude: country.latitude,
            longitude: country.longitude,
          }));
        })
      );
  }

  getCountry(code: string): Observable<CountryData> {
    const url = `${this.api}/${code}`;
    return this.http
      .get<any>(url, {
        params: { format: 'json' },
      })
      .pipe(
        map((data) => {
          const country = data[1][0];
          return {
            name: country.name,
            capitalCity: country.capitalCity,
            region: country.region.value,
            incomeLevel: country.incomeLevel.value,
            latitude: country.latitude,
            longitude: country.longitude,
          };
        })
      );
  }
}
