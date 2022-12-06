import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Atencion } from 'src/app/models/atencion.model';
import { Especialidad } from 'src/app/models/especialidad.model';
import { Medico } from 'src/app/models/medico';

import { AtencionService } from 'src/app/services/atencion.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { AtencionValidator } from 'src/app/validators/atencion-validator';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  atencion: Atencion;
  listadoEspecialidades: Especialidad[];
  listadoMedicos: Medico[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private especialidadService: EspecialidadService,
    private atencionService: AtencionService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      paciente: ['', Validators.required],
      documento: ['', Validators.required],
      costo: ['', Validators.required],
      especialidadId: ['', Validators.required],
      medicoId: ['', Validators.required],
      fecha: [
        '',
        Validators.required,
        AtencionValidator.atencionMenor3Fechas(this.atencionService),
      ],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();

    this.suscripcion.add(
      this.especialidadService.obtener().subscribe({
        next: (listado: Especialidad[]) => {
          this.listadoEspecialidades = listado;

          this.formulario.get('especialidadId')?.valueChanges.subscribe({
            next: (valor) => {
              let idMedico = valor;

              this.especialidadService.getComboMedicoID(idMedico).subscribe({
                next: (listado: Medico[]) => {
                  this.listadoMedicos = listado;
                },
                error: () => {
                  alert('ERROR especialidadService.getComboMedicoID');
                },
              });
            },
            error: () => {
              alert('ERROR formulario.get()');
            },
          });
        },
        error: () => {
          alert('ERROR especialidadService.obtener');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.atencion = this.formulario.value;

      this.suscripcion.add(
        this.atencionService.guardar(this.atencion).subscribe({
          next: () => {
            this.router.navigate(['listado']);
          },
          error: () => {
            alert('ERROR atencionService.guardar');
          },
        })
      );
    } else {
      alert('ERROR CARGA DE FORMULARIO');
    }
  }

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.atencionService.obtenerPorId(id).subscribe({
            next: (a: Atencion) => {
              this.atencion = a;

              this.formulario = this.fb.group({
                id: [a.id, Validators.required],
                paciente: [a.paciente, Validators.required],
                documento: [a.documento, Validators.required],
                costo: [a.costo, Validators.required],
                especialidadId: [a.especialidadId, Validators.required],
                medicoId: [a.medicoId, Validators.required],
                fecha: [
                  a.fecha,
                  Validators.required,
                  AtencionValidator.atencionMenor3Fechas(this.atencionService),
                ],
              });
            },
            error: () => {
              alert('ERROR atencionService.obtenerPorId');
            },
          });
        }
      },
      error: () => {
        alert('ERROR CARGA DE FORMULARIO');
      },
    });
  }
}
