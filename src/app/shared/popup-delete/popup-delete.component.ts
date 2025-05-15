import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserData } from '../table/table.component';

@Component({
  selector: 'app-popup-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss'],
})
export class PopupDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserData }
  ) {}
}
