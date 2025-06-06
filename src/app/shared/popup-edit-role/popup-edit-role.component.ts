import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { RoleData } from '../../models/role.model';
import { FormEditRoleComponent } from '../form-edit-role/form-edit-role.component';

@Component({
  selector: 'app-popup-edit-role',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormEditRoleComponent],
  templateUrl: './popup-edit-role.component.html',
  styleUrl: './popup-edit-role.component.scss',
})
export class PopupEditRoleComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEditRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: RoleData }
  ) {}

  handleFormSubmit(formData: RoleData): void {
    this.dialogRef.close({
      roleId: this.data.role.id,
      formData,
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get mappedRoleData(): RoleData {
    return {
      id: this.data.role.id,
      name: this.data.role.name,
      description: this.data.role.description,
    };
  }
}
