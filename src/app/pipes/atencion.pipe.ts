import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costoTotal',
})
export class AtencionPipe implements PipeTransform {
  private readonly porcentaje_defecto = 21;
  transform(costo: number, ...args: any[]): unknown {
    args[0] = args[0] ? args[0] : this.porcentaje_defecto;
    const resultado = costo + (costo * args[0]) / 100;
    return resultado;
  }
}
