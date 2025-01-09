import { TestBed } from '@angular/core/testing';

import { CountryIdService } from './country-id.service';

describe('CountryIdService', () => {
  let service: CountryIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
