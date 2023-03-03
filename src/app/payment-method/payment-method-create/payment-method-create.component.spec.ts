import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodCreateComponent } from './payment-method-create.component';

describe('PaymentMethodCreateComponent', () => {
  let component: PaymentMethodCreateComponent;
  let fixture: ComponentFixture<PaymentMethodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
