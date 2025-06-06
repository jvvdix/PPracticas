import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteRoleComponent } from './popup-delete-role.component';

describe('PopupDeleteRoleComponent', () => {
  let component: PopupDeleteRoleComponent;
  let fixture: ComponentFixture<PopupDeleteRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDeleteRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
