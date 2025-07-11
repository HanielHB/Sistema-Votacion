// src/components/MesaForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { MesaService } from "../services/MesaService";
import { RecintoService } from "../services/RecintoService";
import { Mesa } from "../models/Mesa";
import { Recinto } from "../models/Recinto";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
    numero: number;
    recinto: string;
};

export const MesaForm = () => {
    const navigate = useNavigate();
    useAuth();

    const { id } = useParams<{ id: string }>();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const [recintos, setRecintos] = useState<Recinto[]>([]);

    // Carga lista de recintos para el select
    useEffect(() => {
        new RecintoService()
        .getRecintos()
        .then((data) => setRecintos(data))
        .catch((error) => console.error("Error cargando recintos:", error));
    }, []);

  // Carga datos si es edición
    useEffect(() => {
        if (id) {
        new MesaService()
            .getMesa(id)
            .then((data) => {
            reset({
                numero: data.numero,
                recinto: data.recinto.toString(),
            });
            })
            .catch((error) => console.error("Error cargando mesa:", error));
        }
    }, [id, reset]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const mesa: Mesa = {
        id: id ?? "",
        numero: data.numero,
        recinto: Number(data.recinto),
        };

    const service = new MesaService();
    const action = id ? service.updateMesa(mesa) : service.insertMesa(mesa);
        action
        .then(() => navigate(URLS.MESAS.LIST))
        .catch((error) => {
            console.error("Error al guardar mesa:", error);
            alert("Hubo un error al guardar la mesa. Intenta nuevamente.");
        });
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title={id ? "Editar Mesa" : "Crear Mesa"} className="mx-5 my-5">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                <label htmlFor="numero">Número de Mesa:</label>
                <Input
                    id="numero"
                    type="number"
                    {...register("numero", { required: true, valueAsNumber: true })}
                />
                {errors.numero && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="recinto">Recinto:</label>
                <select id="recinto" {...register("recinto", { required: true })}>
                    <option value="">-- Seleccione un recinto --</option>
                    {recintos.map((r) => (
                    <option key={r.id} value={r.id}>
                        {r.nombre}
                    </option>
                    ))}
                </select>
                {errors.recinto && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
