import { Component, OnInit  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Nota, NotaWithKey } from '../../models/nota';
import { NotaService } from '../../services/nota.service';
import { ActivatedRoute, Router } from '@angular/router';  // Importa ActivatedRoute y Router


@Component({
  selector: 'app-listar-nota',
  templateUrl: './listar-nota.component.html',
  styleUrls: ['./listar-nota.component.css']
})

export class ListarNotaComponent implements OnInit {
  notas$: Observable<NotaWithKey[]>;
  // Agregar una propiedad para la nota que se está modificando
  notaAModificar: NotaWithKey | null = null;

  constructor(private notaService: NotaService, 
    private toastr: ToastrService,
    private router: Router,  // Agrega el Router aquí
    private route: ActivatedRoute
   ) {
    this.notas$ = new Observable<NotaWithKey[]>();
  }

  ngOnInit() {
    this.notas$ = this.notaService.getNotas();
  }

  eliminarNota(nota: NotaWithKey): void {
    console.log('Nota a eliminar:', nota);
  
    if (nota.key !== null && confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      console.log('Eliminando nota con key:', nota.key);
      this.notaService.eliminarNota(nota.key).then(() => {
        console.log('Nota eliminada con éxito');
        this.toastr.success('Nota eliminada con éxito', 'Eliminada');
        
      }).catch(error => {
        console.error('Error al eliminar la nota:', error);
        this.toastr.error('Error al eliminar la nota', 'Error');
      });
    }
  }
  seleccionarNotaParaModificar(nota: NotaWithKey): void {
    this.router.navigate(['/crear-nota', nota.key]);
  }
  
}
