import { Component, HostListener } from '@angular/core';
import { HomeComponent } from '../features/home/home.component';
import { OurCompaniesComponent } from '../features/our-companies/our-companies.component';
import { ServicesComponent } from '../features/services/services.component';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-init',
  standalone: true,
  imports: [HomeComponent, OurCompaniesComponent, ServicesComponent],
  templateUrl: './init.component.html',
  styleUrl: './init.component.scss',
})
export class InitComponent {
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
