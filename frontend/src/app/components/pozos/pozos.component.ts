import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PozosService } from '../../services/pozos.service';
import { UnidadesPipe } from '../../pipes/unidades.pipe';
import { EstadoPozoDirective } from '../../directives/estado-pozo.directive';

interface Pozo {
  id?: number;
  nombre: string;
  ubicacion: string;
  produccion_diaria: number;
  estado: 'activo' | 'inactivo';
}

@Component({
  selector: 'app-pozos',
  templateUrl: './pozos.component.html',
  styleUrls: ['./pozos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, UnidadesPipe, EstadoPozoDirective],
  providers: [PozosService]
})
export class PozosComponent implements OnInit {

  pozos: Pozo[] = [];
  nombre: string = '';
  ubicacion: string = '';
  produccion_diaria: number = 0;
  estado: 'activo' | 'inactivo' = 'activo';

  constructor(private pozosService: PozosService) {}

  ngOnInit() {
    this.cargarPozos();
  }

  cargarPozos() {
    this.pozosService.getPozos().subscribe({
      next: data => this.pozos = data,
      error: err => console.error('Error obteniendo pozos', err)
    });
  }

  agregarPozo() {
    const nuevo: Pozo = {
      nombre: this.nombre,
      ubicacion: this.ubicacion,
      produccion_diaria: this.produccion_diaria,
      estado: this.estado
    };
    this.pozosService.createPozo(nuevo).subscribe({
      next: () => {
        this.cargarPozos();
        this.nombre = '';
        this.ubicacion = '';
        this.produccion_diaria = 0;
        this.estado = 'activo';
      },
      error: err => console.error('Error agregando pozo', err)
    });
  }

  toggleEstado(pozo: Pozo) {
    const nuevoEstado: 'activo' | 'inactivo' = pozo.estado === 'activo' ? 'inactivo' : 'activo';
    this.pozosService.updateEstado(pozo.id!, nuevoEstado).subscribe({
      next: () => this.cargarPozos(),
      error: err => console.error('Error cambiando estado', err)
    });
  }

  get porcentajeActivos(): number {
    if (this.pozos.length === 0) return 0;
    const activos = this.pozos.filter(p => p.estado === 'activo').length;
    return Math.round((activos / this.pozos.length) * 100);
  }

  get porcentajeInactivos(): number {
    return 100 - this.porcentajeActivos;
  }

  get produccionTotalActiva(): number {
    return this.pozos
      .filter(p => p.estado === 'activo')
      .reduce((sum, p) => sum + p.produccion_diaria, 0);
  }

}
