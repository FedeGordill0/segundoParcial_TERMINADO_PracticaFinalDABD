import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AtencionService } from '../services/atencion.service';

export class AtencionValidator {
  static atencionMenor3Fechas(
    atencionService: AtencionService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return atencionService.atencionMenor3Fechas(control.value).pipe(
        map((resultado: boolean) => {
          return resultado ? { atencionMenor3Fechas: resultado } : null;
        })
      );
    };
  }
}
