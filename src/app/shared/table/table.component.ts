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
import { PopupComponent } from '../popup/popup.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  role: 'Student' | 'Professor' | 'Admin' | 'Tutor' | 'Delegado';
  status: 'Active' | 'Pending';
  photoUrl: string;
}

@Component({
  selector: 'app-table',
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
    PopupComponent,
    PopupDeleteComponent,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() userData: UserData[] = [];

  @Output() edit = new EventEmitter<string>(); //el boton de editar
  @Output() delete = new EventEmitter<string>(); //el boton de eliminar

  displayedColumns: string[] = [
    'photo',
    'id',
    'name',
    'email',
    'role',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<UserData>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData'] && changes['userData'].currentValue) {
      this.dataSource.data = this.userData;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(id: string) {
    this.edit.emit(id);
  }

  deleteUser(id: string) {
    const user = this.userData.find((u) => u.id === id);
    if (!user) return;

    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      data: { user }, // ← Aquí se pasan los datos correctamente
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.delete.emit(id);
      }
    });
  }
}
