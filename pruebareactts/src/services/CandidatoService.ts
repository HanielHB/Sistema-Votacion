import apiClient from "./interceptors";
import { Candidato } from "../models/Candidato";

/**
 * Servicio para CRUD de Candidatos usando la API REST de Django.
 */
export class CandidatoService {
    /** Convierte la respuesta del backend al modelo Candidato */
    private mapToModel(data: any): Candidato {
        return {
            id: data.id.toString(),
            nombre: data.nombre,
            partido: data.partido,
            cargo: data.cargo,
            // Si el backend retorna detalles anidados:
            partidoDetalle: data.partido_detalle,
            cargoDetalle: data.cargo_detalle,
        };
    }

    /** Obtiene todos los candidatos */
    getCandidatos(): Promise<Candidato[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("candidato/")
                .then((response) => {
                    const items: Candidato[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener los candidatos: " + error.message))
                );
        });
    }

    /** Obtiene un candidato por ID */
    getCandidato(id: string): Promise<Candidato> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`candidato/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener el candidato: " + error.message))
                );
        });
    }

    /** Crea un nuevo candidato */
    insertCandidato(candidato: Omit<Candidato, "id">): Promise<Candidato> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: candidato.nombre,
                partido: candidato.partido,
                cargo: candidato.cargo,
            };
            apiClient
                .post("candidato/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar el candidato: " + error.message))
                );
        });
    }

    /** Actualiza un candidato existente */
    updateCandidato(candidato: Candidato): Promise<Candidato> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: candidato.nombre,
                partido: candidato.partido,
                cargo: candidato.cargo,
            };
            apiClient
                .put(`candidato/${candidato.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar el candidato: " + error.message))
                );
        });
    }

    /** Elimina un candidato por ID */
    deleteCandidato(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`candidato/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar el candidato: " + error.message))
                );
        });
    }
}
