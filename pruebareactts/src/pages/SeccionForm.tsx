// src/components/SeccionForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { SeccionService } from "../services/SeccionService";
import { Seccion } from "../models/Seccion";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
    nombre: string;
    coordenadasMapa: string;
};

export const SeccionForm = () => {
    const navigate = useNavigate();
    useAuth();
    const { id } = useParams<{ id: string }>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

  // Carga datos al editar
    useEffect(() => {
        if (id) {
        new SeccionService()
            .getSeccion(id)
            .then((data) => {
            reset({
                nombre: data.nombre,
                coordenadasMapa: data.coordenadasMapa,
            });
            })
            .catch((error) => console.error("Error cargando sección:", error));
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const seccion: Seccion = {
        id: id ?? "",
        nombre: data.nombre,
        coordenadasMapa: data.coordenadasMapa,
        };

        const service = new SeccionService();
        const action = id
        ? service.updateSeccion(seccion)
        : service.insertSeccion({ nombre: data.nombre, coordenadasMapa: data.coordenadasMapa });

        action
        .then(() => navigate(URLS.SECCIONES.LIST))
        .catch((error) => {
            console.error("Error guardando sección:", error);
            alert("Hubo un error al guardar la sección. Intenta nuevamente.");
        });
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title={id ? "Editar Sección" : "Crear Sección"} className="mx-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                <label htmlFor="nombre">Nombre:</label>
                <Input id="nombre" {...register("nombre", { required: true })} />
                {errors.nombre && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="coordenadasMapa">Coordenadas Mapa:</label>
                <Input id="coordenadasMapa" {...register("coordenadasMapa", { required: true })} />
                {errors.coordenadasMapa && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
