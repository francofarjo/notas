export interface Nota {
      titulo: string;
      descripcion: string;
      fechaInicio: Date;
      fechaVencimiento: Date;
    }
    
    export interface NotaWithKey extends Nota {
      key: string | null;
    }
    