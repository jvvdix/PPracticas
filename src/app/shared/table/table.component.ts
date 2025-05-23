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
import { PopupEditComponent } from '../popup-edit/popup-edit.component';

export interface UserData {
  id: number;
  username: string;
  email: string;
  name: string;
  lastName: string;
  status: boolean;
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
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() userData: UserData[] = [];

  @Output() edit = new EventEmitter<number>(); // mejor que sea number para id
  @Output() delete = new EventEmitter<number>();

  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'email',
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
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filterPredicate = (data: UserData, filter: string) => {
      return (
        data.id.toString().includes(filter) ||
        data.username.toLowerCase().includes(filter) ||
        (data.name + ' ' + data.lastName).toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter)
      );
    };
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(id: number) {
    const user = this.userData.find((u) => Number(u.id) === id);
    if (!user) return;
    const dialogRef = this.dialog.open(PopupEditComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.edit.emit(id);
      }
    });
  }

  deleteUser(id: number) {
    const user = this.userData.find((u) => u.id === id);
    if (!user) return;
    const dialogRef = this.dialog.open(PopupDeleteComponent, {
      data: { user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.delete.emit(id);
      }
    });
  }
}
