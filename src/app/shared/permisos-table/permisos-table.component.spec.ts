import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosTableComponent } from './permisos-table.component';

describe('PermisosTableComponent', () => {
  let component: PermisosTableComponent;
  let fixture: ComponentFixture<PermisosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisosTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
