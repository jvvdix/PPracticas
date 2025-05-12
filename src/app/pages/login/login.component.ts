import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  toggleForm: boolean = false;
  registerObj: any = {
    //aqui añadiria los datos del formulario de registro
    userId: 0, //empezamos el id en 0 y lo incrementamos al añadir un nuevo usuario
  };
}
