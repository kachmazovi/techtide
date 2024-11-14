import { Component, HostListener } from '@angular/core';
import { HomeComponent } from './features/home/home.component';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.commonServ.isScrolled.set(window.scrollY > 0);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.commonServ.currentCoords.set({ x: event.x, y: event.y });
  }

  constructor(private commonServ: CommonService) {}
}
