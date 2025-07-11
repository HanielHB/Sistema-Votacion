export interface Mesa {
    /** Identificador único de la mesa (primary key del backend) */
    id: string;
    /** Número de la mesa */
    numero: number;
    /** ID del recinto al que pertenece esta mesa */
    recinto: number;
}