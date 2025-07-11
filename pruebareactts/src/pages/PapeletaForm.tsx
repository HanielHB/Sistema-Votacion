// src/components/PapeletaForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { FormField } from "../components/FormField";
import { FileInput } from "../components/FileInput";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { PapeletaService } from "../services/PapeletaService";
import { SeccionService } from "../services/SeccionService";
import { Seccion } from "../models/Seccion";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
    seccion: string;
    archivo: FileList;
};

export const PapeletaForm = () => {
    const navigate = useNavigate();
    useAuth();

    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [secciones, setSecciones] = useState<Seccion[]>([]);

    // Carga las secciones para el select
    useEffect(() => {
        new SeccionService()
        .getSecciones()
        .then((data) => setSecciones(data))
        .catch((error) => console.error("Error cargando secciones:", error));
    }, []);

  // Si es edición, carga la papeleta
    useEffect(() => {
        if (id) {
        new PapeletaService()
            .getPapeleta(id)
            .then((p) => {
            reset({
                seccion: p.seccion.toString(),
                archivo: undefined as any,
            });
            })
            .catch((error) => console.error("Error cargando papeleta:", error));
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const service = new PapeletaService();
        const seccionId = Number(data.seccion);
        const action = id
        ? service.updatePapeleta(id, seccionId, data.archivo)
        : service.insertPapeleta(seccionId, data.archivo);

        action
        .then(() => navigate(URLS.PAPELETAS.LIST))
        .catch((error) => {
            console.error("Error guardando papeleta:", error);
            alert("Hubo un error al guardar la papeleta. Intenta nuevamente.");
        });
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title={id ? "Editar Papeleta" : "Crear Papeleta"} className="mx-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                <label htmlFor="seccion">Sección:</label>
                <select id="seccion" {...register("seccion", { required: true })}>
                    <option value="">-- Seleccione una sección --</option>
                    {secciones.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.nombre}
                    </option>
                    ))}
                </select>
                {errors.seccion && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="archivo">Archivo Papeleta:</label>
                <FileInput id="archivo" {...register("archivo", { required: !id })} />
                {errors.archivo && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
