import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { authGuard } from './guards/auth.guard'; // Asegúrate de importar tu guard
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [authGuard], //el authguard asegura que, si no estás loggeado, no puedes acceder aquí
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'permisos',
        component: PermisosComponent,
        canActivate: [authGuard],
      },
      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full', // ❌ sin canActivate aquí
      },
    ],
  },
  {
    path: 'layout',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
