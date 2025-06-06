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
  FormCreateRoleComponent,
  RoleFormData,
} from '../form-create-role/form-create-role.component';
import { RoleService } from '../../services/role.service';

// Componente del diálogo
@Component({
  selector: 'app-dialog-content-role',
  template: `
    <h2 mat-dialog-title class="title">Crear rol</h2>

    <mat-dialog-content>
      <app-form-create-role
        (formSubmit)="onFormSubmit($event)"
        (cancelEdit)="onCancel()"
      ></app-form-create-role>
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

      p,
      i {
        color: #212529;
      }
    `,
  ],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormCreateRoleComponent],
})
export class DialogContentRoleComponent {
  private roleService = inject(RoleService);
  constructor(public dialogRef: MatDialogRef<DialogContentRoleComponent>) {}

  onFormSubmit(formData: RoleFormData) {
    const newRole = {
      name: formData.name,
      description: formData.description,
    };

    this.roleService.createRole(newRole).subscribe({
      next: () => {
        this.dialogRef.close(true);
        console.log('rol creado');
      },
      error: (err) => {
        console.error('Error creando rol:', err);
      },
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

// componente principal que abre el diálogo
@Component({
  selector: 'app-popup-create-role',
  template: `
    <button
      mat-button
      class="custom-button"
      (click)="openDialog('300ms', '200ms')"
    >
      <i class="material-icons">add</i>
      <p>Nuevo rol</p>
    </button>
  `,
  styleUrls: ['./popup-create-role.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupCreateRoleComponent {
  readonly dialog = inject(MatDialog);

  @Output() roleCreated = new EventEmitter<void>();

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogContentRoleComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.roleCreated.emit();
      }
    });
  }
}
