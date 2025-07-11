import { Partido } from "./Partido";
import { Cargo } from "./Cargo";

/**
 * Representa un candidato en el sistema electoral.
 */
export interface Candidato {
    /** Identificador único del candidato (primary key del backend) */
    id: string;
    /** Nombre completo del candidato */
    nombre: string;
    /** ID del partido al que pertenece */
    partido: number;
    /** ID del cargo al que aspira */
    cargo: number;
    /** (Opcional) Detalles del partido */
    partidoDetalle?: Partido;
    /** (Opcional) Detalles del cargo */
    cargoDetalle?: Cargo;
}
