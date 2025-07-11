export interface Seccion {
    /** Identificador único de la sección (clave primaria del backend) */
    id: string;
    /** Nombre de la sección */
    nombre: string;
    /** Coordenadas del mapa en formato JSON o texto */
    coordenadasMapa: string;
}
