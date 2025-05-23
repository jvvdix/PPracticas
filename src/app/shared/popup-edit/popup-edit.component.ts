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
    const updatedUser = {
      ...formData,
      id: this.data.user.id,
    };

    console.log('Usuario actualizado:', updatedUser);
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get mappedUserData(): UserFormData {
    return {
      fullName: `${this.data.user.name} ${this.data.user.lastName}`,
      email: this.data.user.email,
      role: this.getUserRole(), // devuelto como literal
      status: this.data.user.status ? 'Active' : 'Pending',
    };
  }

  private getUserRole():
    | 'Student'
    | 'Professor'
    | 'Admin'
    | 'Tutor'
    | 'Delegado' {
    return 'Student';
  }
}
