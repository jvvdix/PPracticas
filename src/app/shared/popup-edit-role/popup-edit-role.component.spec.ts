import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditRoleComponent } from './popup-edit-role.component';

describe('PopupEditRoleComponent', () => {
  let component: PopupEditRoleComponent;
  let fixture: ComponentFixture<PopupEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupEditRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
