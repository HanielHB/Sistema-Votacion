import apiClient from "./interceptors";
import { Votante } from "../models/Votante";

/**
 * Servicio para CRUD de Votantes usando la API REST de Django.
 */
export class VotanteService {
    private mapToModel(data: any): Votante {
        return {
        id: data.id.toString(),
        ci: data.ci,
        nombre: data.nombre,
        apellidoPaterno: data.apellido_paterno,
        apellidoMaterno: data.apellido_materno,
        mesa: data.mesa,
        };
    }

    getVotantes(): Promise<Votante[]> {
        return new Promise((resolve, reject) => {
        apiClient
            .get("votantes/")
            .then((response) => {
            const items: Votante[] = response.data.map((d: any) => this.mapToModel(d));
            resolve(items);
            })
            .catch((error) => reject(new Error("Error al obtener los votantes: " + error.message)));
        });
    }

    getVotante(id: string): Promise<Votante> {
        return new Promise((resolve, reject) => {
        apiClient
            .get(`votantes/${id}/`)
            .then((response) => resolve(this.mapToModel(response.data)))
            .catch((error) => reject(new Error("Error al obtener el votante: " + error.message)));
        });
    }

    insertVotante(votante: Votante): Promise<Votante> {
        return new Promise((resolve, reject) => {
        const payload = {
            ci: votante.ci,
            nombre: votante.nombre,
            apellido_paterno: votante.apellidoPaterno,
            apellido_materno: votante.apellidoMaterno,
            mesa: votante.mesa,
        };
        apiClient
            .post("votantes/", payload)
            .then((response) => resolve(this.mapToModel(response.data)))
            .catch((error) => reject(new Error("Error al insertar el votante: " + error.message)));
        });
    }

    updateVotante(votante: Votante): Promise<Votante> {
        return new Promise((resolve, reject) => {
        const payload = {
            ci: votante.ci,
            nombre: votante.nombre,
            apellido_paterno: votante.apellidoPaterno,
            apellido_materno: votante.apellidoMaterno,
            mesa: votante.mesa,
        };
        apiClient
            .put(`votantes/${votante.id}/`, payload)
            .then((response) => resolve(this.mapToModel(response.data)))
            .catch((error) => reject(new Error("Error al actualizar el votante: " + error.message)));
        });
    }

    deleteVotante(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
        apiClient
            .delete(`votantes/${id}/`)
            .then(() => resolve())
            .catch((error) => reject(new Error("Error al eliminar el votante: " + error.message)));
        });
    }
}