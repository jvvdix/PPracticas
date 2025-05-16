import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { FormCreateUserComponent } from '../form-create-user/form-create-user.component';

// Componente del diálogo
@Component({
  selector: 'app-dialog-content',
  template: `
    <h2 mat-dialog-title class="title">Crear usuario</h2>

    <mat-dialog-content>
      <app-form-create-user></app-form-create-user>
    </mat-dialog-content>
  `,
  styles: [
    `
      .title {
        text-align: center;
        font-weight: semibold;
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
  imports: [MatDialogModule, MatButtonModule, MatIcon, FormCreateUserComponent],
})
export class DialogContentComponent {
  constructor(public dialogRef: MatDialogRef<DialogContentComponent>) {}
}

// Componente principal que abre el diálogo
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogContentComponent, {
      width: '550px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
