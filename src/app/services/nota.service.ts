import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/compat/database';

import { Observable } from 'rxjs';
import { Nota, NotaWithKey } from '../models/nota';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class NotaService {
 
  private notas$: Observable<{ key: string | null, 
    titulo: string, 
    descripcion: string, 
    fechaInicio: Date, 
    fechaVencimiento: Date }[]>;

    constructor(private db: AngularFireDatabase) {
      this.notas$ = this.db.list('/Notas').snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as Nota;
            const key = c.payload.key;
            return { key, ...data };
          });
        })
      );
    }
  
    getNotas(): Observable<{ key: string | null, titulo: string, descripcion: string, fechaInicio: Date, fechaVencimiento: Date }[]> {
      return this.notas$;
    }

    // Método para agregar una nueva nota a la base de datos
    agregarNota(nota: Nota): Promise<void> {
       // Usar la función then() para resolver la Promise
       return this.db.list('/Notas').push(nota).then(() => {});
    } 

     // Método para eliminar una nota de la base de datos
      eliminarNota(notaId: string): Promise<void> {
        return this.db.list('/Notas').remove(notaId);
      }

      getNotaById(notaId: string): Observable<NotaWithKey | null> {
        return this.notas$.pipe(
          map(notas => notas.find(nota => nota.key === notaId) || null)
        );
      }

      editarNota(nota: NotaWithKey): Promise<void> {
        const notaId = nota.key;
        if (!notaId) {
          // No hay clave, no se puede editar
          return Promise.reject('No se proporcionó una clave válida para editar la nota.');
        }
    
        return this.db.list('/Notas').update(notaId, nota).then(() => {});
      }
    
}
