export interface Votante {
    /** Identificador único generado por el backend */
    id: string;
    /** Cédula de identidad */
    ci: string;
    /** Nombre(s) del votante */
    nombre: string;
    /** Apellido paterno */
    apellidoPaterno: string;
    /** Apellido materno */
    apellidoMaterno: string;
    /** ID de la mesa asignada (puede ser null si no está asignado) */
    mesa?: number | null;
}