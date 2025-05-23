import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, inject } from '@angular/core';
import { LoginModel, UserRegister } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  toggleForm: boolean = false;
  registerObj: UserRegister = new UserRegister();
  loginObj: LoginModel = new LoginModel();
  UserService = inject(UserService);
  router = inject(Router);

  onRegister(event: Event): void {
    event.preventDefault();
    this.UserService.registerUser(this.registerObj).subscribe(
      (res: UserRegister) => {
        alert('Se ha completado el registro');
        this.toggleForm = false;
      },
      (error) => {
        alert(error.error);
      }
    );
  }

  onLogin(event: Event): void {
    event.preventDefault();
    this.UserService.onLogin(this.loginObj).subscribe(
      (res: any) => {
        const token = res;
        localStorage.setItem('token', token);

        const payload = this.parseJwt(token);
        const userId = payload?.id ?? payload?.sub;

        //obtiene el id del usuario se mostrará en el sidenav
        this.UserService.getUserById(userId).subscribe((userData: any) => {
          localStorage.setItem('user', JSON.stringify(userData));
          alert('Login correcto. Redirigiendo...');
          this.router.navigateByUrl('/usuarios');
        });
      },
      () => alert('Contraseña y/o mail incorrectos.')
    );
  }

  //  para decodificar el payload del JWT y poder coger el id del usuario
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  }
}
