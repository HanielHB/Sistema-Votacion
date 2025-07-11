// src/components/VotanteForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { VotanteService } from "../services/VotanteService";
import { Votante } from "../models/Votante";
import { MesaService } from "../services/MesaService";
import { Mesa } from "../models/Mesa";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
    ci: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    mesa?: string;  // almacenamos el id de la mesa como string
};

export const VotanteForm = () => {
    const navigate = useNavigate();
    useAuth();

    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [mesas, setMesas] = useState<Mesa[]>([]);

  // Cargar las mesas para el select
    useEffect(() => {
        new MesaService()
        .getMesas()
        .then((data) => setMesas(data))
        .catch((error) => console.error("Error cargando mesas:", error));
    }, []);

  // Cargar datos si es edición
    useEffect(() => {
        if (id) {
        new VotanteService()
            .getVotante(id)
            .then((data) => {
            reset({
                ci: data.ci,
                nombre: data.nombre,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                mesa: data.mesa ? data.mesa.toString() : undefined,
            });
            })
            .catch((error) => console.error("Error cargando votante:", error));
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const votante: Votante = {
        id: id ?? "",
        ci: data.ci,
        nombre: data.nombre,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        mesa: data.mesa ? Number(data.mesa) : null,
        };

        const service = new VotanteService();
        const action = id ? service.updateVotante(votante) : service.insertVotante(votante);
        action
        .then(() => navigate(URLS.VOTANTES.LIST))
        .catch((error) => {
            console.error("Error al guardar votante:", error);
            alert("Hubo un error al guardar el votante. Intenta nuevamente.");
        });
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title={id ? "Editar Votante" : "Crear Votante"} className="mx-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>

                <FormField>
                <label htmlFor="ci">Cédula:</label>
                <Input id="ci" {...register("ci", { required: true })} />
                {errors.ci && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="nombre">Nombre:</label>
                <Input id="nombre" {...register("nombre", { required: true })} />
                {errors.nombre && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="apellidoPaterno">Apellido Paterno:</label>
                <Input id="apellidoPaterno" {...register("apellidoPaterno", { required: true })} />
                {errors.apellidoPaterno && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="apellidoMaterno">Apellido Materno:</label>
                <Input id="apellidoMaterno" {...register("apellidoMaterno", { required: true })} />
                {errors.apellidoMaterno && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="mesa">Mesa:</label>
                <select id="mesa" {...register("mesa")}>
                    <option value="">-- Sin asignar --</option>
                    {mesas.map((m) => (
                    <option key={m.id} value={m.id}>
                        Mesa {m.numero}
                    </option>
                    ))}
                </select>
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
