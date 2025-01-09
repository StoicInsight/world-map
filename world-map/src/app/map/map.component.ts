import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Output,
  EventEmitter,
  Inject,
} from '@angular/core';
import { WorldBankService } from '../world-bank.service';
import { CountryData } from '../country-data';
import { CountryIdService } from '../country-id.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) svgMap!: ElementRef;
  private previousElement: SVGPathElement | null = null;

  @Output() countryClicked = new EventEmitter<string>();

  constructor(
    private worldBankService: WorldBankService,
    @Inject(CountryIdService) private countryIdService: CountryIdService
  ) {}

  ngAfterViewInit() {
    if (!this.svgMap) {
      console.error('SVG map not found');
      return;
    }

    // Access all <path> elements inside the SVG
    const paths = this.svgMap.nativeElement.querySelectorAll('path');

    paths.forEach((path: SVGPathElement) => {
      path.style.fill = 'lightgray';
      path.addEventListener('click', (event: MouseEvent) => {
        const clickedPath = event.target as SVGPathElement;
        if (this.previousElement) {
          this.previousElement.style.fill = 'lightgray';
        }

        clickedPath.style.fill = 'lightblue';
        this.previousElement = clickedPath;
        this.clickCountry(event);
      });
    });
  }

  clickCountry(event: MouseEvent) {
    const clickedElement = event.target as SVGPathElement; // Type assertion
    clickedElement.style.fill = 'lightblue';
    if (clickedElement && clickedElement.id) {
      this.countryClicked.emit(clickedElement.id);
      this.countryIdService.setCountryId(clickedElement.id);
      console.log('ID Clicked:', clickedElement.id);
      this.worldBankService
        .getCountry(clickedElement.id)
        .subscribe((country: CountryData) => {
          console.log('Country data:', country);
        });
      console.warn('Clicked element does not have an ID');
    }
  }
}
