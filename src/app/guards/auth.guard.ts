import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  if (!userService.isLoggedIn()) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};

//cogido de https://dev.to/cristian_arieta_7df932e5f/guards-en-angular-protegiendo-nuestras-rutas-1677#:~:text=En%20Angular%2C%20los%20guards%20(guardianes,navegar%20a%20una%20ruta%20espec%C3%ADfica.
