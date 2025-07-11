export interface Recinto {
    /** Identificador único del recinto (primary key del backend) */
    id: string;
    /** Nombre del recinto */
    nombre: string;
    /** Ubicación física del recinto */
    ubicacion: string;
    /** ID de la sección a la que pertenece el recinto */
    seccion: number;
}
