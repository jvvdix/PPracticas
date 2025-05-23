import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';
import { UserData } from '../../models/userdata'; // Ruta corregida
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
    this.userService.getAllUsers().subscribe((data) => {
      console.log('USERS:', data);
      this.users = data;
    });
  }

  handleEdit(userId: number) {
    // aqui tiene que ir la logica de editar
  }

  handleDelete(userId: number) {
    // y aqui la de eliminar
  }
}
