import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageListComponent } from './custom-message-list.component';

describe('CustomMessageListComponent', () => {
  let component: CustomMessageListComponent;
  let fixture: ComponentFixture<CustomMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomMessageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
