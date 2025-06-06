import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesTableComponent } from '../../shared/roles-table/roles-table.component';
import { RoleData } from '../../models/role.model';
import { RoleService } from '../../services/role.service';

export interface RoleFormData {
  name: string;
  description: string;
}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RolesTableComponent, CommonModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  roles: RoleData[] = [];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
    this.fetchRoles();
  }

  //coge todos los roles con getAllRoles del servicio
  fetchRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
        console.log('Roles recargados:', this.roles);
      },
      error: (err) => {
        console.error('Error al recargar los roles:', err);
      },
    });
  }

  //maneja lo q pasa con el updateRole y el formulairo de edicion

  handleEdit(event: { roleId: number; formData: RoleFormData }) {
    const { roleId, formData } = event;

    this.roleService.updateRole(roleId, { ...formData }).subscribe({
      next: () => {
        console.log('Rol actualizado');
        this.fetchRoles();
      },
      error: (err) => {
        console.error('Error al actualizar el rol:', err);
        if (err.status === 403) {
          alert('No tienes permiso para editar roles.');
        } else {
          alert('Ocurrió un error al intentar actualizar el rol.');
        }
      },
    });
  }

  handleDelete(roleId: number) {
    this.roleService.deleteRole(roleId).subscribe({
      next: () => {
        alert(`Rol con ID ${roleId} eliminado`);
        this.fetchRoles();
      },
      error: (err) => {
        if (err.status === 403) {
          alert('No tienes permiso para eliminar roles.');
        } else {
          console.error('Error al eliminar el rol:', err);
          alert('Ocurrió un error al intentar eliminar el rol.');
        }
      },
    });
  }
}
