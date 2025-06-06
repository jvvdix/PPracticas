import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

export interface RoleData {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-popup-delete-role',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './popup-delete-role.component.html',
  styleUrls: ['./popup-delete-role.component.scss'],
})
export class PopupDeleteRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupDeleteRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: RoleData }
  ) {}
}
