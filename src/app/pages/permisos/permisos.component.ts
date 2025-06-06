import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermisoService } from '../../services/permiso.service';
import { PermisoData } from '../../models/permiso.model';
import { PermisosTableComponent } from '../../shared/permisos-table/permisos-table.component';

@Component({
  selector: 'app-permisos',
  standalone: true,
  imports: [CommonModule, PermisosTableComponent],
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {
  permisos: PermisoData[] = [];

  constructor(private permisoService: PermisoService) {}

  ngOnInit(): void {
    this.fetchPermisos();
  }

  fetchPermisos(): void {
    this.permisoService.getAllPermisos().subscribe({
      next: (data) => {
        this.permisos = data;
        console.log('Permisos cargados:', this.permisos);
      },
      error: (err) => {
        console.error('Error al obtener los permisos:', err);
      },
    });
  }
}
