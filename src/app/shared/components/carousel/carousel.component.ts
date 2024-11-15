import { NgStyle } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ViewChild('slider1') slider1!: ElementRef;
  @ViewChild('slider2') slider2!: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.parentInnerWidth =
      this.slider1.nativeElement.parentElement.clientWidth;
  }

  public images = Array.from({ length: 10 }, (_, i) => i + 1);
  public sliderWidth = this.images.length * 260;
  public slider1PositionX = 0;
  public slider2PositionX = 0;
  public parentInnerWidth = 0;

  private intervalId?: number;
  private isHodling = signal(false);

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startAnimation();
      this.renderer.setStyle(this.slider2.nativeElement, 'display', 'none');
      this.parentInnerWidth =
        this.slider1.nativeElement.parentElement.clientWidth;
    }, 100);
  }

  ngOnDestroy(): void {
    this.clearAnimation();
  }

  public onMouseDown(): void {
    this.setCursorStyle('grabbing');
    this.isHodling.set(true);
    this.clearAnimation();
  }

  public onMouseMove(): void {
    this.setCursorStyle('grab');
  }

  public onMouseUp(): void {
    this.setCursorStyle('grab');
    this.isHodling.set(false);
  }

  private setCursorStyle(cursor: string): void {
    this.renderer.setStyle(this.slider1.nativeElement, 'cursor', cursor);
  }

  private startAnimation(): void {
    if (this.intervalId === undefined) {
      this.slider2PositionX = this.getNextPositionX(this.slider1PositionX);
      setTimeout(() => {
        this.animateSliders();
        this.intervalId = window.setInterval(() => {
          this.animateSliders();
        }, 2500);
      }, 100);
    }
  }

  private clearAnimation(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private animateSliders(): void {
    this.renderer.setStyle(this.slider1.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.slider2.nativeElement, 'display', 'flex');

    this.slider1PositionX -= 260;
    this.slider2PositionX -= 260;

    if (this.slider1PositionX < -this.sliderWidth) {
      this.renderer.setStyle(this.slider1.nativeElement, 'display', 'none');
      this.slider1PositionX = this.getNextPositionX(this.slider2PositionX);
    }

    if (this.slider2PositionX < -this.sliderWidth) {
      this.renderer.setStyle(this.slider2.nativeElement, 'display', 'none');
      this.slider2PositionX = this.getNextPositionX(this.slider1PositionX);
    }
  }

  private getNextPositionX(currentPosition: number): number {
    return this.sliderWidth > this.parentInnerWidth
      ? currentPosition + this.sliderWidth
      : currentPosition + this.parentInnerWidth + 260;
  }
}
