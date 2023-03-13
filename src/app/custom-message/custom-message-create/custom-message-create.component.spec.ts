import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageCreateComponent } from './custom-message-create.component';

describe('CustomMessageCreateComponent', () => {
  let component: CustomMessageCreateComponent;
  let fixture: ComponentFixture<CustomMessageCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMessageCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMessageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
