import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { CommonService } from './shared/services/common.service';
import { OurCompaniesComponent } from './features/our-companies/our-companies.component';
import { ServicesComponent } from './features/services/services.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, OurCompaniesComponent, ServicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    setTimeout(() => {
      this.commonServ.isScrolled.set(window.scrollY > 80);
    }, 300);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.commonServ.currentCoords.set({ x: event.x, y: event.y });
  }

  constructor(private commonServ: CommonService) {}
}
