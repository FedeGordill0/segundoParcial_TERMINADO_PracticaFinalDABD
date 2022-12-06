import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListadoComponent } from './atenciones/listado/listado.component';
import { ModificarComponent } from './atenciones/modificar/modificar.component';
import { AtencionPipe } from './pipes/atencion.pipe';

@NgModule({
  declarations: [AppComponent, ListadoComponent, ModificarComponent, AtencionPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
