// src/services/JuradoService.ts
import apiClient from "./interceptors";
import { Jurado } from "../models/Jurado";

/**
 * Servicio para CRUD de Jurados usando la API REST de Django.
 */
export class JuradoService {
    /** Convierte la respuesta del backend al modelo Jurado */
    private mapToModel(data: any): Jurado {
        return {
            id: data.id.toString(),
            ci: data.ci,
            nombre: data.nombre,
            apellidoPaterno: data.apellido_paterno,
            apellidoMaterno: data.apellido_materno,
            mesa: data.mesa,
        };
    }

    /** Obtiene todos los jurados */
    getJurados(): Promise<Jurado[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("jurados/")
                .then((response) => {
                    const items: Jurado[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener los jurados: " + error.message))
                );
        });
    }

    /** Obtiene un jurado por ID */
    getJurado(id: string): Promise<Jurado> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`jurados/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener el jurado: " + error.message))
                );
        });
    }

    /** Crea un nuevo jurado */
    insertJurado(jurado: Omit<Jurado, "id">): Promise<Jurado> {
        return new Promise((resolve, reject) => {
            const payload = {
                ci: jurado.ci,
                nombre: jurado.nombre,
                apellido_paterno: jurado.apellidoPaterno,
                apellido_materno: jurado.apellidoMaterno,
                mesa: jurado.mesa,
            };
            apiClient
                .post("jurados/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar el jurado: " + error.message))
                );
        });
    }

    /** Actualiza un jurado existente */
    updateJurado(jurado: Jurado): Promise<Jurado> {
        return new Promise((resolve, reject) => {
            const payload = {
                ci: jurado.ci,
                nombre: jurado.nombre,
                apellido_paterno: jurado.apellidoPaterno,
                apellido_materno: jurado.apellidoMaterno,
                mesa: jurado.mesa,
            };
            apiClient
                .put(`jurados/${jurado.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar el jurado: " + error.message))
                );
        });
    }

    /** Elimina un jurado por ID */
    deleteJurado(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`jurados/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar el jurado: " + error.message))
                );
        });
    }
}
