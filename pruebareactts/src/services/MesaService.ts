import apiClient from "./interceptors";
import { Mesa } from "../models/Mesa";

/**
 * Servicio para CRUD de Mesas usando la API REST de Django.
 */
export class MesaService {
    private mapToModel(data: any): Mesa {
        return {
            id: data.id.toString(),
            numero: data.numero,
            recinto: data.recinto,
        };
    }

    /** Obtiene todas las mesas */
    getMesas(): Promise<Mesa[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("mesa/")
                .then((response) => {
                    const items: Mesa[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener las mesas: " + error.message))
                );
        });
    }

    /** Obtiene una sola mesa por ID */
    getMesa(id: string): Promise<Mesa> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`mesa/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener la mesa: " + error.message))
                );
        });
    }

    /** Inserta una nueva mesa */
    insertMesa(mesa: Mesa): Promise<Mesa> {
        return new Promise((resolve, reject) => {
            const payload = {
                numero: mesa.numero,
                recinto: mesa.recinto,
            };
            apiClient
                .post("mesa/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar la mesa: " + error.message))
                );
        });
    }

    /** Actualiza una mesa existente */
    updateMesa(mesa: Mesa): Promise<Mesa> {
        return new Promise((resolve, reject) => {
            const payload = {
                numero: mesa.numero,
                recinto: mesa.recinto,
            };
            apiClient
                .put(`mesa/${mesa.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar la mesa: " + error.message))
                );
        });
    }

    deleteMesa(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`mesa/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar la mesa: " + error.message))
                );
        });
    }
}
