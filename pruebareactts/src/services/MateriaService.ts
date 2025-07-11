// src/services/PapeletaService.ts
import apiClient from "./interceptors";
import { Papeleta } from "../models/Papeleta";

/**
 * Respuesta paginada de papeletas desde el backend.
 */
export interface PapeletaPage {
    count: number;
    next: string | null;
    previous: string | null;
    results: Papeleta[];
}

/**
 * Servicio para CRUD de Papeletas usando la API REST de Django.
 */
export class PapeletaService {
    /** Mapea un objeto JSON al modelo Papeleta */
    private mapToModel(data: any): Papeleta {
        return {
            id: data.id.toString(),
            seccion: data.seccion,
            archivo: data.archivo,
        };
    }

    /**
     * Obtiene una página de papeletas, soporta paginación.
     * @param page Número de página (inicia en 1)
     */
    getPapeletas(page: number = 1): Promise<PapeletaPage> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`papeletas/?page=${page}`)
                .then((response) => {
                    const data = response.data;
                    const pageData: PapeletaPage = {
                        count: data.count,
                        next: data.next,
                        previous: data.previous,
                        results: data.results.map((d: any) => this.mapToModel(d)),
                    };
                    resolve(pageData);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener las papeletas: " + error.message))
                );
        });
    }

    /** Obtiene una sola papeleta por ID */
    getPapeleta(id: string): Promise<Papeleta> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`papeletas/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener la papeleta: " + error.message))
                );
        });
    }

    /** Inserta una nueva papeleta (sube archivo) */
    insertPapeleta(seccionId: number, archivo: FileList): Promise<Papeleta> {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("seccion", seccionId.toString());
            if (archivo && archivo.length > 0) {
                formData.append("archivo", archivo[0]);
            }
            apiClient
                .post("papeletas/", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar la papeleta: " + error.message))
                );
        });
    }

    /** Actualiza una papeleta existente (puede actualizar archivo) */
    updatePapeleta(id: string, seccionId: number, archivo?: FileList): Promise<Papeleta> {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("seccion", seccionId.toString());
            if (archivo && archivo.length > 0) {
                formData.append("archivo", archivo[0]);
            }
            apiClient
                .put(`papeletas/${id}/`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar la papeleta: " + error.message))
                );
        });
    }

    /** Elimina una papeleta por ID */
    deletePapeleta(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`papeletas/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar la papeleta: " + error.message))
                );
        });
    }
}
