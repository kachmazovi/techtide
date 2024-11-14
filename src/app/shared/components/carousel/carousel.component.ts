import {
  AfterViewInit,
  Component,
  ElementRef,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('slider') slider!: ElementRef;

  public images = Array.from({ length: 10 });
  public isHodling = signal(false);

  ngAfterViewInit(): void {
    this.slider.nativeElement.style.width = `${this.images.length * 260}px`;
  }

  public onMouseDown() {
    this.slider.nativeElement.style.cursor = 'grabbing';
    console.log(this.slider);
  }

  public onMouseMove(event: MouseEvent) {
    this.slider.nativeElement.style.cursor = 'grab';
  }

  public onMouseUp() {
    this.slider.nativeElement.style.cursor = 'grab';
  }
}
