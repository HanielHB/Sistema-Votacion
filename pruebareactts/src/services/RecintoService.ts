// src/services/RecintoService.ts
import apiClient from "./interceptors";
import { Recinto } from "../models/Recinto";

/**
 * Servicio para CRUD de Recintos usando la API REST de Django.
 */
export class RecintoService {
    private mapToModel(data: any): Recinto {
        return {
            id: data.id.toString(),
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            seccion: data.seccion,
        };
    }

    /** Obtiene todos los recintos */
    getRecintos(): Promise<Recinto[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("recinto/")
                .then((response) => {
                    const items: Recinto[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener los recintos: " + error.message))
                );
        });
    }

    /** Obtiene un recinto por ID */
    getRecinto(id: string): Promise<Recinto> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`recinto/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener el recinto: " + error.message))
                );
        });
    }

    /** Crea un nuevo recinto */
    insertRecinto(recinto: Omit<Recinto, 'id'>): Promise<Recinto> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: recinto.nombre,
                ubicacion: recinto.ubicacion,
                seccion: recinto.seccion,
            };
            apiClient
                .post("recinto/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar el recinto: " + error.message))
                );
        });
    }

    /** Actualiza un recinto existente */
    updateRecinto(recinto: Recinto): Promise<Recinto> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: recinto.nombre,
                ubicacion: recinto.ubicacion,
                seccion: recinto.seccion,
            };
            apiClient
                .put(`recinto/${recinto.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar el recinto: " + error.message))
                );
        });
    }

    /** Elimina un recinto por ID */
    deleteRecinto(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`recinto/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar el recinto: " + error.message))
                );
        });
    }
}
