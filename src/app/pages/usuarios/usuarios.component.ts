import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { UsersService } from '../../services/users.service'; // Ruta corregida
import { UserData } from '../../models/userdata'; // Ruta corregida
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  users: UserData[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      console.log('USERS:', data);
      this.users = data;
    });
  }

  handleEdit(userId: string) {
    // Implementa tu lógica de edición
  }

  handleDelete(userId: string) {
    // Implementa tu lógica de eliminación
  }
}
