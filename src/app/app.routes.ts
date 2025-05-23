import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermisosComponent } from './pages/permisos/permisos.component';
import { authGuard } from './guards/auth.guard';

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
    canActivate: [authGuard], // 🔥 Guard aplicado al padre
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent,
        // Ya no necesita canActivate aquí porque el padre ya lo tiene
      },
      {
        path: 'roles',
        component: RolesComponent,
      },
      {
        path: 'permisos',
        component: PermisosComponent,
      },
      {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
