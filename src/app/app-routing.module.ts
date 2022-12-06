import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListadoComponent } from './atenciones/listado/listado.component';
import { ModificarComponent } from './atenciones/modificar/modificar.component';

const routes: Routes = [
  { path: 'listado', component: ListadoComponent },
  { path: 'modificar/:id', component: ModificarComponent },
  { path: '', redirectTo: 'listado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
