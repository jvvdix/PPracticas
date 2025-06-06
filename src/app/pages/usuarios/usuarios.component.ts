import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { UserData } from '../../models/userdata';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  users: UserData[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  handleEdit(event: any) {
    const { userId, formData } = event;
    console.log('Editando usuario:', userId, formData);

    // payload exacto que espera la API
    const updatePayload = {
      username: formData.username,
      password: formData.password || '', //si no se cambia la pass, se mantiene
      email: formData.email,
      name: formData.name,
      lastName: formData.lastName,
      status: formData.status,
    };

    console.log('Payload final:', updatePayload);

    this.userService.updateUser(userId, updatePayload).subscribe({
      next: (response) => {
        console.log('Usuario actualizado exitosamente:', response);
        alert('Usuario actualizado correctamente');
        this.fetchUsers();
      },
      error: (err) => {
        console.error('Error al actualizar el usuario:', err);
        alert(
          'Error al actualizar el usuario: ' +
            (err.error?.message || err.message)
        );
      },
    });
  }

  handleDelete(userId: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          alert(`Usuario con ID ${userId} eliminado`);
          this.users = this.users.filter((user) => user.id !== userId);
        },
        error: (err) => {
          if (err.status === 403) {
            alert('No tienes permiso para eliminar usuarios.');
          } else {
            console.error('Error al eliminar el usuario:', err);
            alert('Ocurrió un error al intentar eliminar el usuario.');
          }
        },
      });
    }
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Usuarios cargados:', this.users);
      },
      error: (err) => {
        console.error('Error al cargar los usuarios:', err);
      },
    });
  }
}
