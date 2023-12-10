import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { AgregarNotaComponent } from './components/agregar-nota/agregar-nota.component';
import { ListarNotaComponent } from './components/listar-nota/listar-nota.component';

const routes: Routes = [
  { path: '', component: ListarNotaComponent }, // Ruta principal muestra la lista de notas
  { path: 'agregar-nota', component: AgregarNotaComponent }, // Ruta para agregar nueva nota
  { path: 'agregar-nota/:id', component: AgregarNotaComponent }, // Ruta para editar nota existente (recibe ID)
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Ruta comodín redirige a la principal
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
