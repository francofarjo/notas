import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nota, NotaWithKey } from '../../models/nota';
import { NotaService } from '../../services/nota.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.component.html',
  styleUrls: ['./agregar-nota.component.css']
})
export class AgregarNotaComponent {
  notaForm: FormGroup;
  isEditMode: boolean = false;
  notaAModificar: NotaWithKey | null = null;

  constructor(private fb: FormBuilder,
    private notaService: NotaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) {
    this.notaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaVencimiento: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Verificar si se proporciona un 'key' en la ruta para determinar si estás en modo edición
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.isEditMode = true;

        // Obtener la nota a editar y cargar sus datos en el formulario
        this.notaService.getNotaById(params['key']).subscribe(nota => {
          if (nota) {
            this.notaAModificar = nota;
            this.notaForm.setValue({
              titulo: nota.titulo,
              descripcion: nota.descripcion,
              fechaInicio: nota.fechaInicio,
              fechaVencimiento: nota.fechaVencimiento
            });
          } else {
            console.error('La nota no fue encontrada.');
          }
        });
      }
    });
  }

  agregarOEditarNota(): void {
    if (this.isEditMode && this.notaAModificar !== null) {
      const notaEditada: NotaWithKey = {
        ...this.notaAModificar,
        ...this.notaForm.value
      };

      this.notaService.editarNota(notaEditada).then(() => {
        this.toastr.success('Nota editada con éxito', 'Editado');
        this.router.navigate(['']); // Redirigir a la vista de listar notas
      }).catch(error => {
        console.error('Error al editar la nota:', error);
        this.toastr.error('Error al editar la nota', 'Error');
      });
    } else {
      const nuevaNota: Nota = this.notaForm.value;

      this.notaService.agregarNota(nuevaNota).then(() => {
        this.toastr.success('Nota agregada con éxito', 'Agregado');
        this.router.navigate(['']); // Redirigir a la vista de listar notas
      }).catch(error => {
        console.error('Error al agregar la nota:', error);
        this.toastr.error('Error al agregar la nota', 'Error');
      });
    }
  }
}
