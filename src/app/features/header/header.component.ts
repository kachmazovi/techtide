import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public commonServ: CommonService) {}
}
