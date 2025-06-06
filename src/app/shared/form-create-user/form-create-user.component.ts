import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
} from '@angular/core';
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
import { UserService } from '../../services/user.service';

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface UserFormData {
  username: string;
  fullName: string;
  email: string;
  role: string;
  status: 'Active' | 'Pending';
}

@Component({
  selector: 'app-form-create-user',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './form-create-user.component.html',
  styleUrls: ['./form-create-user.component.scss'],
})
export class FormCreateUserComponent implements OnInit {
  @Input() userData?: Partial<UserFormData>;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  roles: Role[] = [];
  statuses: UserFormData['status'][] = ['Active', 'Pending'];

  private userService = inject(UserService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
    this.loadRoles();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      username: [this.userData?.username || '', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName: [this.userData?.fullName || '', [Validators.required]],
      email: [
        this.userData?.email || '',
        [Validators.required, Validators.email],
      ],
      role: [this.userData?.role || '', [Validators.required]],
      status: [this.userData?.status || 'Active', [Validators.required]],
    });
  }

  loadRoles(): void {
    this.userService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;

        if (!this.editForm.get('role')?.value && roles.length > 0) {
          this.editForm.get('role')?.setValue(roles[0].name);
        }
      },
      error: (err) => {
        console.error('Error cargando roles:', err);
        this.roles = [];
      },
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
