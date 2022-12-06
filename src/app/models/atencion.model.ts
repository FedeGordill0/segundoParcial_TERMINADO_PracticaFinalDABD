import { Especialidad } from './especialidad.model';
import { Medico } from './medico';

export interface Atencion {
  id: string;
  paciente: string;
  documento: number;
  subEspecialidadId: string;
  costo: number;
  fecha: Date;

  especialidadId: string;
  especialidad: Especialidad;

  medicoId: number;
  medico: Medico;
}
