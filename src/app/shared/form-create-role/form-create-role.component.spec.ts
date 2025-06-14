import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateRoleComponent } from './form-create-role.component';

describe('FormCreateRoleComponent', () => {
  let component: FormCreateRoleComponent;
  let fixture: ComponentFixture<FormCreateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCreateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
