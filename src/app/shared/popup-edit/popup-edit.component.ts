import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserData } from '../table/table.component';
import {
  FormEditUserComponent,
  UserFormData,
} from '../form-edit-user/form-edit-user.component';

@Component({
  selector: 'app-popup-edit',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormEditUserComponent],
  templateUrl: './popup-edit.component.html',
  styleUrl: './popup-edit.component.scss',
})
export class PopupEditComponent {
  constructor(
    public dialogRef: MatDialogRef<PopupEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserData }
  ) {}

  handleFormSubmit(formData: UserFormData): void {
    console.log('Form data recibida en popup:', formData);

    this.dialogRef.close({
      userId: this.data.user.id,
      formData,
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get mappedUserData(): UserFormData {
    const userData: UserFormData = {
      id: this.data.user.id,
      fullName: `${this.data.user.name || ''} ${
        this.data.user.lastName || ''
      }`.trim(),
      email: this.data.user.email,

      status: this.convertToBoolean(this.data.user.status),
      username: this.data.user.username,
      name: this.data.user.name,
      lastName: this.data.user.lastName,
    };

    console.log('Mapped user data:', userData);
    return userData;
  }

  private convertToBoolean(status: any): boolean {
    if (typeof status === 'boolean') {
      return status;
    }
    if (typeof status === 'string') {
      return (
        status.toLowerCase() === 'active' || status.toLowerCase() === 'true'
      );
    }
    if (typeof status === 'number') {
      return status === 1;
    }
    return false;
  }
}
