import { Especialidad } from './especialidad.model';

export class Medico {
  id: number;
  nombre: string;

  especialidadId: number;
  especialidad: Especialidad;
}
