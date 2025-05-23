//REGISTRO

export class UserRegister {
  username: string;
  password: string;
  email: string;
  name: string;
  lastName: string;
  status: boolean;

  constructor() {
    this.username = '';
    this.password = '';
    this.email = '';
    this.name = '';
    this.lastName = '';
    this.status = true;
  }
}

//LOGIN
export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
