import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditRoleComponent } from './form-edit-role.component';

describe('FormEditRoleComponent', () => {
  let component: FormEditRoleComponent;
  let fixture: ComponentFixture<FormEditRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
