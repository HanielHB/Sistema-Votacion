
import { Seccion } from "./Seccion";


export interface Cargo {
    /** Identificador único del cargo (primary key del backend) */
    id: string;
    /** Nombre descriptivo del cargo */
    nombre: string;
    /** IDs de las secciones afectadas por este cargo */
    seccionesAfectadas: number[];
    /** (Opcional) Información detallada de las secciones afectadas */
    secciones?: Seccion[];
}
