import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRolesComponent } from './table-roles.component';

describe('TableRolesComponent', () => {
  let component: TableRolesComponent;
  let fixture: ComponentFixture<TableRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
