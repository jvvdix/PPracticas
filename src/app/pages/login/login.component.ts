import { Router, RouterModule } from '@angular/router';
import { routes } from './../../app.routes';
import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { LoginModel, UserRegister } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

//
//
export class LoginComponent {
  toggleForm: boolean = false;
  registerObj: UserRegister = new UserRegister();
  loginObj: LoginModel = new LoginModel();
  UserService = inject(UserService);
  router = inject(Router);

  //REGISTRO
  onRegister() {
    this.UserService.registerUser(this.registerObj).subscribe(
      (res: UserRegister) => {
        alert('Se ha completado el registro');
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  //LOGIN
  onLogin() {
    this.UserService.onLogin(this.loginObj).subscribe(
      (res: UserRegister) => {
        localStorage.setItem('user', JSON.stringify(res)); // guardar usuario
        alert(
          'Se ha encontrado el usuario, se redirigirá a la gestión de usuarios'
        );
        this.router.navigateByUrl('/usuarios');
      },
      (error) => {
        alert('Contraseña y/o mail incorrectos.');
      }
    );
  }
}
