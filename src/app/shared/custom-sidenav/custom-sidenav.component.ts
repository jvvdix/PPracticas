import { MatListModule } from '@angular/material/list';
import { Component, computed, inject, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [CommonModule, MatIconModule, MatListModule, RouterModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss',
  standalone: true,
})
export class CustomSidenavComponent {
  sideNavCollapsed = signal(false);

  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    { icon: 'account_box', label: 'Usuarios', route: '/usuarios' },
    { icon: 'lock_outline', label: 'Roles', route: '/roles' },
    { icon: 'security', label: 'Permisos', route: '/permisos' },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  private userService = inject(UserService);
  currentUser = this.userService.getCurrentUser(); // ✅ Cacheamos el usuario

  logout() {
    this.userService.logout();
  }
}
