import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pozo {
  id?: number;
  nombre: string;
  ubicacion: string;
  produccion_diaria: number;
  estado: 'activo' | 'inactivo';
}

@Injectable({
  providedIn: 'root'
})
export class PozosService {
  private apiUrl = 'http://localhost:3000/pozos';

  constructor(private http: HttpClient) {}

  getPozos(): Observable<Pozo[]> {
    return this.http.get<Pozo[]>(this.apiUrl);
  }

  createPozo(pozo: Pozo): Observable<Pozo> {
    return this.http.post<Pozo>(this.apiUrl, pozo);
  }

  updateEstado(id: number, estado: 'activo' | 'inactivo'): Observable<Pozo> {
    return this.http.patch<Pozo>(`${this.apiUrl}/${id}`, { estado });
  }
}
