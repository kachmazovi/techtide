import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { DotsComponent } from '../../shared/components/dots/dots.component';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, DotsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  @ViewChild('dotsThird', { read: ElementRef }) dotsFirst!: ElementRef;
  @ViewChild('dotsSecond', { read: ElementRef }) dotsSecond!: ElementRef;
  @ViewChild('dotsFirst', { read: ElementRef }) dotsThird!: ElementRef;

  constructor(private commonServ: CommonService) {
    this.moveDots();
  }

  private moveDots(): void {
    effect(() => {
      this.dotsFirst.nativeElement.style.left = `${
        200 - this.commonServ.currentCoords().x / 20
      }px`;
      this.dotsFirst.nativeElement.style.top = `${
        700 - this.commonServ.currentCoords().y / 20
      }px`;
      this.dotsSecond.nativeElement.style.right = `${
        200 + this.commonServ.currentCoords().x / 20
      }px`;
      this.dotsSecond.nativeElement.style.top = `${
        300 - this.commonServ.currentCoords().y / 20
      }px`;
      this.dotsThird.nativeElement.style.left = `${
        400 - this.commonServ.currentCoords().x / 80
      }px`;
      this.dotsThird.nativeElement.style.top = `${
        180 - this.commonServ.currentCoords().y / 80
      }px`;
    });
  }
}
