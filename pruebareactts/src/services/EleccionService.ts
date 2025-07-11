import apiClient from "./interceptors";
import { Eleccion } from "../models/Eleccion";

/**
 * Servicio para CRUD de Elecciones usando la API REST de Django.
 */
export class EleccionService {
    /** Convierte la respuesta del backend al modelo Eleccion */
    private mapToModel(data: any): Eleccion {
        return {
            id: data.id.toString(),
            tipo: data.tipo,
            fecha: data.fecha,
            descripcion: data.descripcion,
        };
    }

    /** Obtiene todas las elecciones */
    getElecciones(): Promise<Eleccion[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("elecciones/")
                .then((response) => {
                    const items: Eleccion[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener las elecciones: " + error.message))
                );
        });
    }

    /** Obtiene una elección por ID */
    getEleccion(id: string): Promise<Eleccion> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`elecciones/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener la elección: " + error.message))
                );
        });
    }

    /** Crea una nueva elección */
    insertEleccion(eleccion: Omit<Eleccion, "id">): Promise<Eleccion> {
        return new Promise((resolve, reject) => {
            const payload = {
                tipo: eleccion.tipo,
                fecha: eleccion.fecha,
                descripcion: eleccion.descripcion,
            };
            apiClient
                .post("elecciones/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar la elección: " + error.message))
                );
        });
    }

    /** Actualiza una elección existente */
    updateEleccion(eleccion: Eleccion): Promise<Eleccion> {
        return new Promise((resolve, reject) => {
            const payload = {
                tipo: eleccion.tipo,
                fecha: eleccion.fecha,
                descripcion: eleccion.descripcion,
            };
            apiClient
                .put(`elecciones/${eleccion.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar la elección: " + error.message))
                );
        });
    }

    /** Elimina una elección por ID */
    deleteEleccion(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`elecciones/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar la elección: " + error.message))
                );
        });
    }
}
