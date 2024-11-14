import { Component } from '@angular/core';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
  selector: 'app-our-companies',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './our-companies.component.html',
  styleUrl: './our-companies.component.scss',
})
export class OurCompaniesComponent {}
