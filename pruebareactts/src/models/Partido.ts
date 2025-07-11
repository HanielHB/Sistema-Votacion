export interface Partido {
    /** Identificador único del partido (primary key del backend) */
    id: string;
    /** Nombre completo del partido */
    nombre: string;
    /** Sigla del partido (abreviatura) */
    sigla: string;
    /** Color representativo del partido */
    color: string;
}
