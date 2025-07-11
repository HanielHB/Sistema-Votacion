import apiClient from "./interceptors";
import { Cargo } from "../models/Cargo";

/**
 * Servicio para CRUD de Cargos usando la API REST de Django.
 */
export class CargoService {
    /** Convierte la respuesta del backend al modelo Cargo */
    private mapToModel(data: any): Cargo {
        return {
            id: data.id.toString(),
            nombre: data.nombre,
            seccionesAfectadas: data.secciones_afectadas,
            // Si la API retorna detalles de secciones, puedes mapearlos así:
            secciones: data.secciones ? data.secciones.map((s: any) => ({
                id: s.id.toString(),
                nombre: s.nombre,
                coordenadasMapa: s.coordenadas_mapa,
            })) : undefined,
        };
    }

    /** Obtiene todos los cargos */
    getCargos(): Promise<Cargo[]> {
        return new Promise((resolve, reject) => {
            apiClient
                .get("cargos/")
                .then((response) => {
                    const items: Cargo[] = response.data.map((d: any) => this.mapToModel(d));
                    resolve(items);
                })
                .catch((error) =>
                    reject(new Error("Error al obtener los cargos: " + error.message))
                );
        });
    }

    /** Obtiene un cargo por ID */
    getCargo(id: string): Promise<Cargo> {
        return new Promise((resolve, reject) => {
            apiClient
                .get(`cargos/${id}/`)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al obtener el cargo: " + error.message))
                );
        });
    }

    /** Crea un nuevo cargo */
    insertCargo(cargo: Omit<Cargo, "id">): Promise<Cargo> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: cargo.nombre,
                secciones_afectadas: cargo.seccionesAfectadas,
            };
            apiClient
                .post("cargos/", payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al insertar el cargo: " + error.message))
                );
        });
    }

    /** Actualiza un cargo existente */
    updateCargo(cargo: Cargo): Promise<Cargo> {
        return new Promise((resolve, reject) => {
            const payload = {
                nombre: cargo.nombre,
                secciones_afectadas: cargo.seccionesAfectadas,
            };
            apiClient
                .put(`cargos/${cargo.id}/`, payload)
                .then((response) => resolve(this.mapToModel(response.data)))
                .catch((error) =>
                    reject(new Error("Error al actualizar el cargo: " + error.message))
                );
        });
    }

    /** Elimina un cargo por ID */
    deleteCargo(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            apiClient
                .delete(`cargos/${id}/`)
                .then(() => resolve())
                .catch((error) =>
                    reject(new Error("Error al eliminar el cargo: " + error.message))
                );
        });
    }
}
