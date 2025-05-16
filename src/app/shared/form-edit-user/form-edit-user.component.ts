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

// Interfaz para los datos del usuario que se pueden editar
export interface UserFormData {
  fullName: string;
  email: string;
  role: 'Student' | 'Professor' | 'Admin' | 'Tutor' | 'Delegado';
  status: 'Active' | 'Pending';
}

@Component({
  selector: 'app-form-edit-user',
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
  standalone: true,
})
export class FormEditUserComponent implements OnInit {
  // entrada para recibir los datos del usuario a editar
  @Input() userData!: {
    fullName: string;
    email: string;
    role: 'Student' | 'Professor' | 'Admin' | 'Tutor' | 'Delegado';
    status: 'Active' | 'Pending';
  };

  // eventos para comunicarse con el componente padre
  @Output() formSubmit = new EventEmitter<UserFormData>();
  @Output() cancelEdit = new EventEmitter<void>();

  // Formulario reactivo
  editForm!: FormGroup;

  // Opciones para los selectores
  roles: string[] = ['Student', 'Professor', 'Admin', 'Tutor', 'Delegado'];
  statuses: string[] = ['Active', 'Pending'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    // Inicializar el formulario con los datos del usuario
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
