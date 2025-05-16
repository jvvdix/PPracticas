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
    // Combina los datos del formulario con el ID y la foto
    const updatedUser = {
      ...formData,
      id: this.data.user.id,
      photoUrl: this.data.user.photoUrl,
    };

    // Aquí normalmente enviarías estos datos a un servicio
    console.log('Usuario actualizado:', updatedUser);

    // Cierra el diálogo con true para indicar edición exitosa
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
