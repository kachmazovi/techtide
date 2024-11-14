import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public isScrolled = signal(false);
  public currentCoords = signal({ x: 0, y: 0 });

  constructor() {}
}
