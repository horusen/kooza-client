import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailerOverviewComponent } from './retailer-overview.component';

describe('RetailerOverviewComponent', () => {
  let component: RetailerOverviewComponent;
  let fixture: ComponentFixture<RetailerOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailerOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
