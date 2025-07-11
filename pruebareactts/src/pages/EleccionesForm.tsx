// src/components/EleccionForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { EleccionService } from "../services/EleccionService";
import { Eleccion, EleccionTipo } from "../models/Eleccion";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  tipo: EleccionTipo;
  fecha: string;
  descripcion: string;
};

export const EleccionForm = () => {
  const navigate = useNavigate();
  useAuth();

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Carga datos para edición
  useEffect(() => {
    if (id) {
      new EleccionService()
        .getEleccion(id)
        .then((data) => {
          reset({
            tipo: data.tipo,
            fecha: data.fecha,
            descripcion: data.descripcion,
          });
        })
        .catch((err) => console.error("Error cargando elección:", err));
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const eleccion: Eleccion = {
      id: id ?? "",
      tipo: data.tipo,
      fecha: data.fecha,
      descripcion: data.descripcion,
    };

    const service = new EleccionService();
    const action = id
      ? service.updateEleccion(eleccion)
      : service.insertEleccion(eleccion);

    action
      .then(() => navigate(URLS.ELECCIONES.LIST))
      .catch((err) => {
        console.error("Error guardando elección:", err);
        alert("Hubo un error al guardar la elección. Intenta nuevamente.");
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title={id ? "Editar Elección" : "Crear Elección"} className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="tipo">Tipo:</label>
              <select id="tipo" {...register("tipo", { required: true })}>
                <option value="">-- Seleccione tipo --</option>
                <option value="nacional">Nacional</option>
                <option value="departamental">Departamental</option>
                <option value="municipal">Municipal</option>
              </select>
              {errors.tipo && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="fecha">Fecha:</label>
              <Input
                id="fecha"
                type="date"
                {...register("fecha", { required: true })}
              />
              {errors.fecha && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="descripcion">Descripción:</label>
              <textarea
                id="descripcion"
                rows={4}
                {...register("descripcion", { required: true })}
                className="w-full border rounded p-2"
              />
              {errors.descripcion && <span>Este campo es requerido</span>}
            </FormField>

            <Button type="submit" title="Guardar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
