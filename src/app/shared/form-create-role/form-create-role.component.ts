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
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from '../../services/role.service';

export interface RoleFormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-form-create-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-create-role.component.html',
  styleUrls: ['./form-create-role.component.scss'],
})
export class FormCreateRoleComponent implements OnInit {
  @Input() roleData?: Partial<RoleFormData>; // puede ser parcial si es creación
  @Output() formSubmit = new EventEmitter<RoleFormData>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  private roleService = inject(RoleService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: [this.roleData?.name || '', [Validators.required]],
      description: [this.roleData?.description || '', [Validators.required]],
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
