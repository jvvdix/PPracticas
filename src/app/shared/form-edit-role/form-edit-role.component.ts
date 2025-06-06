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
import { RoleData } from '../../models/role.model';

export interface RoleFormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-form-edit-role',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './form-edit-role.component.html',
  styleUrl: './form-edit-role.component.scss',
})
export class FormEditRoleComponent implements OnInit {
  @Input() roleData!: RoleData;
  @Output() formSubmit = new EventEmitter<RoleData>();
  @Output() cancelEdit = new EventEmitter<void>();

  editForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editForm = this.fb.group({
      name: [
        this.roleData?.name || '',
        [Validators.required, Validators.minLength(2)],
      ],
      description: [
        this.roleData?.description || '',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formValue = this.editForm.value;

      const roleUpdatePayload: RoleData = {
        id: this.roleData.id, // Incluir el ID
        name: formValue.name,
        description: formValue.description,
      };

      this.formSubmit.emit(roleUpdatePayload);
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.cancelEdit.emit();
  }
}
