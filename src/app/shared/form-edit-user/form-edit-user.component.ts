import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

// Tipos para los campos de formulario
export type UserRole = 'Student' | 'Professor' | 'Admin' | 'Tutor' | 'Delegado';
export type UserStatus = 'Active' | 'Pending';

// Interfaz para los datos del usuario que se pueden editar
export interface UserFormData {
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

@Component({
  selector: 'app-form-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './form-edit-user.component.html',
  styleUrl: './form-edit-user.component.scss',
})
export class FormEditUserComponent implements OnInit {
  @Input() userData!: UserFormData;

  @Output() formSubmit = new EventEmitter<UserFormData>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  roles: UserRole[] = ['Student', 'Professor', 'Admin', 'Tutor', 'Delegado'];
  statuses: UserStatus[] = ['Active', 'Pending'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      fullName: [this.userData?.fullName || '', [Validators.required]],
      email: [
        this.userData?.email || '',
        [Validators.required, Validators.email],
      ],
      role: [this.userData?.role || 'Student', [Validators.required]],
      status: [this.userData?.status || 'Active', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.formSubmit.emit(this.editForm.value);
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}
