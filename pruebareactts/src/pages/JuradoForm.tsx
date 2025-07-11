import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../components/FormField";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { JuradoService } from "../services/JuradoService";
import { MesaService } from "../services/MesaService";
import { SeccionService } from "../services/SeccionService";
import { Jurado } from "../models/Jurado";
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
    mesa: string;
};

export const JuradoForm = () => {
    const navigate = useNavigate();
    useAuth();
    const { id } = useParams<{ id: string }>();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();
    const [mesas, setMesas] = useState<Mesa[]>([]);

    // Carga de mesas
    useEffect(() => {
        new MesaService()
        .getMesas()
        .then(data => setMesas(data))
        .catch(err => console.error("Error cargando mesas:", err));
    }, []);

  // Carga datos si es edición
    useEffect(() => {
        if (id) {
        new JuradoService()
            .getJurado(id)
            .then(data => {
            reset({
                ci: data.ci,
                nombre: data.nombre,
                apellidoPaterno: data.apellidoPaterno,
                apellidoMaterno: data.apellidoMaterno,
                mesa: data.mesa.toString(),
            });
            })
            .catch(err => console.error("Error cargando jurado:", err));
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<Inputs> = data => {
        const jurado: Jurado = {
        id: id ?? "",
        ci: data.ci,
        nombre: data.nombre,
        apellidoPaterno: data.apellidoPaterno,
        apellidoMaterno: data.apellidoMaterno,
        mesa: Number(data.mesa),
        };

        const service = new JuradoService();
        const action = id
        ? service.updateJurado(jurado)
        : service.insertJurado({ ci: jurado.ci, nombre: jurado.nombre, apellidoPaterno: jurado.apellidoPaterno, apellidoMaterno: jurado.apellidoMaterno, mesa: jurado.mesa });

        action
        .then(() => navigate(URLS.JURADOS.LIST))
        .catch(err => {
            console.error("Error guardando jurado:", err);
            alert("Hubo un error al guardar el jurado. Intenta nuevamente.");
        });
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title={id ? "Editar Jurado" : "Crear Jurado"} className="mx-5 my-5">
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
                <select id="mesa" {...register("mesa", { required: true })}>
                    <option value="">-- Seleccione mesa --</option>
                    {mesas.map(m => (
                    <option key={m.id} value={m.id}>{`Mesa ${m.numero}`}</option>
                    ))}
                </select>
                {errors.mesa && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};

export default JuradoForm;
