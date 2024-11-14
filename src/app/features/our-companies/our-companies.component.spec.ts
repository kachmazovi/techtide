import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCompaniesComponent } from './our-companies.component';

describe('OurCompaniesComponent', () => {
  let component: OurCompaniesComponent;
  let fixture: ComponentFixture<OurCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurCompaniesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
