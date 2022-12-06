import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Especialidad } from '../models/especialidad.model';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  private URL: string =
    'https://6317ca93f6b281877c5d7785.mockapi.io/especialidad/';

  constructor(private http: HttpClient) {}

  obtener(): Observable<Especialidad[]> {
    return this.http.get<Especialidad[]>(this.URL);
  }

  getComboMedicoID(id: number): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.URL}${id}/medico`);
  }
}
