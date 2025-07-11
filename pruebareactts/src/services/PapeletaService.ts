import apiClient from "./interceptors";
import { Papeleta } from "../models/Papeleta";

/**
 * Servicio para CRUD de Papeletas usando la API REST de Django.
 */
export class PapeletaService {
    /** Mapea la respuesta del backend al modelo Papeleta */
    private mapToModel(data: any): Papeleta {
        return {
            id: data.id.toString(),
            seccion: data.seccion,
            archivo: data.archivo,
        };
    }

    /** Obtiene todas las papeletas */
    getPapeletas(): Promise<Papeleta[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("papeletas/")
                .then((response) => {
                    const items: Papeleta[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener las papeletas: " + error.message))
                );
        });
    }

    /** Obtiene una papeleta por ID */
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
