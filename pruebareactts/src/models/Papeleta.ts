export interface Papeleta {
    /** Identificador único de la papeleta (primary key del backend) */
    id: string;
    /** ID de la sección a la que pertenece la papeleta */
    seccion: number;
    /** Ruta o URL del archivo de la papeleta */
    archivo: string;
}
