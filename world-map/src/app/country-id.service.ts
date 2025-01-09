import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryIdService {
  private clickedCountryId = new BehaviorSubject<string | null>(null);
  public currentCountryId$ = this.clickedCountryId.asObservable();

  setCountryId(id: string) {
    this.clickedCountryId.next(id);
  }
}
