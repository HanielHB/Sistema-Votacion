// src/services/PartidoService.ts
import apiClient from "./interceptors";
import { Partido } from "../models/Partido";

/**
 * Servicio para CRUD de Partidos usando la API REST de Django.
 */
export class PartidoService {
    /** Convierte la respuesta del backend al modelo Partido */
    private mapToModel(data: any): Partido {
        return {
            id: data.id.toString(),
            nombre: data.nombre,
            sigla: data.sigla,
            color: data.color,
        };
    }

    /** Obtiene todos los partidos */
    getPartidos(): Promise<Partido[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("partidos/")
                .then((response) => {
                    const items: Partido[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener los partidos: " + error.message))
                );
        });
    }

    /** Obtiene un partido por ID */
    getPartido(id: string): Promise<Partido> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`partidos/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener el partido: " + error.message))
                );
        });
    }

    /** Crea un nuevo partido */
    insertPartido(partido: Omit<Partido, "id">): Promise<Partido> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: partido.nombre,
                sigla: partido.sigla,
                color: partido.color,
            };
            apiClient
                .post("partidos/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar el partido: " + error.message))
                );
        });
    }

    /** Actualiza un partido existente */
    updatePartido(partido: Partido): Promise<Partido> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: partido.nombre,
                sigla: partido.sigla,
                color: partido.color,
            };
            apiClient
                .put(`partidos/${partido.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar el partido: " + error.message))
                );
        });
    }

    /** Elimina un partido por ID */
    deletePartido(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`partidos/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar el partido: " + error.message))
                );
        });
    }
}
