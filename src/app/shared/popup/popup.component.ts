import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import {
  FormCreateUserComponent,
  UserFormData,
} from '../form-create-user/form-create-user.component';
import { UserService } from '../../services/user.service';

// Componente del diálogo
@Component({
  selector: 'app-dialog-content',
  template: `
    <h2 mat-dialog-title class="title">Crear usuario</h2>

    <mat-dialog-content>
      <app-form-create-user
        (formSubmit)="onFormSubmit($event)"
        (cancelEdit)="onCancel()"
      ></app-form-create-user>
    </mat-dialog-content>
  `,
  styles: [
    `
      .title {
        text-align: center;
        font-weight: 600;
      }

      .center-actions {
        justify-content: center;
      }

      .custom-button {
        color: black;
        transition: background-color 0.2s ease-in-out;
      }

      .custom-button:hover {
        background-color: #e0e0e0;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormCreateUserComponent],
})
export class DialogContentComponent {
  @Output() userCreated = new EventEmitter<void>();
  private userService = inject(UserService);
  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}

  onFormSubmit(formData: UserFormData & { password: string }) {
    const [name, ...lastNameParts] = formData.fullName.split(' ');
    const lastName = lastNameParts.join(' ') || '';

    const newUser = {
      username: formData.username,
      password: formData.password,
      name,
      lastName,
      email: formData.email,
      role: formData.role,
      status: formData.status === 'Active',
    };

    this.userService.createUser(newUser).subscribe({
      next: () => {
        this.dialogRef.close(true);
        console.log('usuario creado');
        this.userCreated.emit();
      },
      error: (err) => {
        console.error('Error creando usuario:', err);
      },
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

// componenre principal que abre el diálogo
@Component({
  selector: 'app-popup',
  template: `
    <button mat-button (click)="openDialog('300ms', '200ms')">
      <i class="material-icons">add</i>
      <p>Nuevo usuario</p>
    </button>
  `,
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupComponent {
  readonly dialog = inject(MatDialog);

  @Output() userCreated = new EventEmitter<void>();

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userCreated.emit();
      }
    });
  }
}
