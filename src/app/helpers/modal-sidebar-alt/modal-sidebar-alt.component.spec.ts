import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSidebarAltComponent } from './modal-sidebar-alt.component';

describe('ModalSidebarAltComponent', () => {
  let component: ModalSidebarAltComponent;
  let fixture: ComponentFixture<ModalSidebarAltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSidebarAltComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSidebarAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
