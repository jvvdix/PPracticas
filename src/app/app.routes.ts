import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { PermisosComponent } from './pages/permisos/permisos.component';

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
      //como se mostraran dentro del layout, serán hijas de este las rutas dentro del sidenav
      {
        path: 'usuarios',
        component: UsuariosComponent,
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
        path: '', //si solo se pone /layout, se redirige a usuarios directamente (si hubiese un dashboard, se redirigiría al dashboard)
        redirectTo: 'usuarios',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: 'layout',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: '**', //cualquier ruta que no exista, se redirige a login
    redirectTo: 'login',
  },
];
