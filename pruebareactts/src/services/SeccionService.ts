// src/services/SeccionService.ts
import apiClient from "./interceptors";
import { Seccion } from "../models/Seccion";

/**
 * Servicio para CRUD de Secciones usando la API REST de Django.
 */
export class SeccionService {
    /** Convierte la respuesta del backend al modelo Seccion */
    private mapToModel(data: any): Seccion {
        return {
            id: data.id.toString(),
            nombre: data.nombre,
            coordenadasMapa: data.coordenadas_mapa,
        };
    }

    /** Obtiene todas las secciones */
    getSecciones(): Promise<Seccion[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("secciones/")
                .then((response) => {
                    const items: Seccion[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener las secciones: " + error.message))
                );
        });
    }

    /** Obtiene una sección por ID */
    getSeccion(id: string): Promise<Seccion> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`secciones/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener la sección: " + error.message))
                );
        });
    }

    /** Crea una nueva sección */
    insertSeccion(seccion: Omit<Seccion, "id">): Promise<Seccion> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: seccion.nombre,
                coordenadas_mapa: seccion.coordenadasMapa,
            };
            apiClient
                .post("secciones/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar la sección: " + error.message))
                );
        });
    }

    /** Actualiza una sección existente */
    updateSeccion(seccion: Seccion): Promise<Seccion> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: seccion.nombre,
                coordenadas_mapa: seccion.coordenadasMapa,
            };
            apiClient
                .put(`secciones/${seccion.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar la sección: " + error.message))
                );
        });
    }

    /** Elimina una sección por ID */
    deleteSeccion(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`secciones/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar la sección: " + error.message))
                );
        });
    }
}
