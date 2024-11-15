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

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isHodling) {
      const diff = this.mouseCurrentX - event.x;
      this.animationSpeed = diff;
      this.mouseCurrentX = event.x;
      this.animateSliders();
    }
  }

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
  private mouseCurrentX = 0;
  private animationSpeed = 2.5;
  private isHodling = false;

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

  public onMouseDown(event: MouseEvent): void {
    this.isHodling = true;
    this.mouseCurrentX = event.x;
    this.setCursorStyle('grabbing');
    this.clearAnimation();
  }

  public onMouseUp(): void {
    this.isHodling = false;
    this.animationSpeed = 2.5;
    this.setCursorStyle('grab');
    this.startAnimation();
  }

  private setCursorStyle(cursor: string): void {
    this.renderer.setStyle(this.slider1.nativeElement, 'cursor', cursor);
    this.renderer.setStyle(this.slider2.nativeElement, 'cursor', cursor);
  }

  private startAnimation(): void {
    if (this.intervalId === undefined) {
      this.slider2PositionX = this.getNextPositionX(this.slider1PositionX);
      this.slider1.nativeElement.style.transition = 'all 0.025s linear';
      this.slider2.nativeElement.style.transition = 'all 0.025s linear';
      setTimeout(() => {
        this.animateSliders();
        this.intervalId = window.setInterval(() => {
          this.animateSliders();
        }, 25);
      }, 0);
    }
  }

  private clearAnimation(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.slider1.nativeElement.style.transition = 'none';
      this.slider2.nativeElement.style.transition = 'none';
    }
  }

  private animateSliders(): void {
    this.renderer.setStyle(this.slider1.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.slider2.nativeElement, 'display', 'flex');

    this.slider1PositionX -= this.animationSpeed;
    this.slider2PositionX -= this.animationSpeed;

    if (this.slider1PositionX < -this.sliderWidth && this.animationSpeed > 0) {
      this.renderer.setStyle(this.slider1.nativeElement, 'display', 'none');
      this.slider1PositionX = this.getNextPositionX(this.slider2PositionX);
    }

    if (this.slider1PositionX + this.sliderWidth > this.sliderWidth) {
      this.slider2PositionX = this.getNextPositionXReversed(
        this.slider1PositionX
      );
    }

    if (this.slider2PositionX < -this.sliderWidth && this.animationSpeed > 0) {
      this.renderer.setStyle(this.slider2.nativeElement, 'display', 'none');
      this.slider2PositionX = this.getNextPositionX(this.slider1PositionX);
    }

    if (
      this.slider2PositionX + this.sliderWidth > this.sliderWidth &&
      this.animationSpeed < 0
    ) {
      this.slider1PositionX = this.getNextPositionXReversed(
        this.slider2PositionX
      );
    }
  }

  private getNextPositionX(currentPosition: number): number {
    return this.sliderWidth > this.parentInnerWidth
      ? currentPosition + this.sliderWidth
      : currentPosition + this.parentInnerWidth + 2.5;
  }

  private getNextPositionXReversed(currentPosition: number): number {
    return this.sliderWidth > this.parentInnerWidth
      ? currentPosition - this.sliderWidth
      : currentPosition - this.parentInnerWidth + 2.5;
  }
}
