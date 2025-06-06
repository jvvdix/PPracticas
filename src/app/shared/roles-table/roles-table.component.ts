import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RoleData } from '../../models/role.model';
import { PopupDeleteRoleComponent } from '../popup-delete-role/popup-delete-role.component';
import { PopupCreateRoleComponent } from '../popup-create-role/popup-create-role.component';
import { PopupEditRoleComponent } from '../popup-edit-role/popup-edit-role.component';

export interface RoleFormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-roles-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    PopupCreateRoleComponent,
  ],
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss'],
})
export class RolesTableComponent implements AfterViewInit, OnChanges {
  @Input() roleData: RoleData[] = [];

  @Output() edit = new EventEmitter<{
    roleId: number;
    formData: RoleData;
  }>();
  @Output() delete = new EventEmitter<number>();
  @Output() roleCreated = new EventEmitter<void>();

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource: MatTableDataSource<RoleData>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<RoleData>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['roleData'] && changes['roleData'].currentValue) {
      this.dataSource.data = this.roleData;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filterPredicate = (data: RoleData, filter: string) =>
      data.id.toString().includes(filter) ||
      data.name.toLowerCase().includes(filter) ||
      data.description.toLowerCase().includes(filter);
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRole(id: number) {
    const role = this.roleData.find((r) => Number(r.id) === id);
    if (!role) return;

    const dialogRef = this.dialog.open(PopupEditRoleComponent, {
      data: { role },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.roleId && result.formData) {
        this.edit.emit(result);
      }
    });
  }

  deleteRole(id: number) {
    const role = this.roleData.find((r) => r.id === id);
    if (!role) return;

    const dialogRef = this.dialog.open(PopupDeleteRoleComponent, {
      data: { role },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.delete.emit(id);
      }
    });
  }

  onRoleCreated() {
    this.roleCreated.emit();
  }
}
