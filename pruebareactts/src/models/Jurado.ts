
export interface Jurado {
    /** Identificador único del jurado (primary key del backend) */
    id: string;
    /** Cédula de identidad */
    ci: string;
    /** Nombre(s) del jurado */
    nombre: string;
    /** Apellido paterno */
    apellidoPaterno: string;
    /** Apellido materno */
    apellidoMaterno: string;
    /** ID de la mesa asignada */
    mesa: number;
}
