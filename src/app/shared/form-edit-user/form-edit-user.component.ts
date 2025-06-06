import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

export interface UserFormData {
  id?: number;
  fullName: string;
  email: string;
  status: boolean;
  username: string;
  name?: string;
  lastName?: string;
}

@Component({
  selector: 'app-form-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './form-edit-user.component.html',
  styleUrl: './form-edit-user.component.scss',
})
export class FormEditUserComponent implements OnInit {
  @Input() userData!: UserFormData;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  statuses = [
    { label: 'Activo', value: true },
    { label: 'Pendiente', value: false },
  ];

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      fullName: [this.userData?.fullName || '', [Validators.required]],
      username: [this.userData?.username || '', [Validators.required]],
      email: [
        this.userData?.email || '',
        [Validators.required, Validators.email],
      ],

      status: [
        this.userData?.status !== undefined ? this.userData.status : false,
        [Validators.required],
      ],
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      // Dividir fullName en name y lastName si es necesario
      const nameParts = formValue.fullName.trim().split(' ');
      const name = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      const userUpdatePayload = {
        username: formValue.username,
        password: '',
        email: formValue.email,
        name: name,
        lastName: lastName,
        status: formValue.status,
      };

      console.log('Payload a enviar:', userUpdatePayload);
      this.formSubmit.emit(userUpdatePayload);
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}
