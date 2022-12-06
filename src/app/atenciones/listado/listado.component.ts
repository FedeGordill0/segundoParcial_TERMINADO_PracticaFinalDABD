import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Atencion } from 'src/app/models/atencion.model';

import { AtencionService } from 'src/app/services/atencion.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  listado: Atencion[];

  private subscription = new Subscription();

  constructor(
    private atencionService: AtencionService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.especialidadService.obtener().subscribe({
        next: (especialidades) => {
          this.atencionService.obtenerTodas().subscribe({
            next: (respuesta) => {
              respuesta.forEach((atencion) => {
                const indice = especialidades.findIndex(
                  (x) => x.id === atencion.especialidadId
                );
                atencion.especialidad = especialidades[indice];
              });
              this.listado = respuesta;
            },
            error: () =>
              alert('Ocurrió un error al intentar obtener las atenciones'),
          });
        },
        error: () => alert('Ocurrió un error al obtener las especialidades'),
      })
    );
  }
}
