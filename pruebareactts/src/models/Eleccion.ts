
export type EleccionTipo = 'nacional' | 'departamental' | 'municipal';


export interface Eleccion {
    /** Identificador único de la elección (primary key del backend) */
    id: string;
    /** Tipo de elección */
    tipo: EleccionTipo;
    /** Fecha de la elección en formato ISO (YYYY-MM-DD) */
    fecha: string;
    /** Descripción de la elección */
    descripcion: string;
}
