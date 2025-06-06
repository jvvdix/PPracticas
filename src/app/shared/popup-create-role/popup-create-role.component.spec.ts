import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateRoleComponent } from './popup-create-role.component';

describe('PopupCreateRoleComponent', () => {
  let component: PopupCreateRoleComponent;
  let fixture: ComponentFixture<PopupCreateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCreateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
