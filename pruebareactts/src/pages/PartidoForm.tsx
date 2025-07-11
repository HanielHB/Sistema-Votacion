// src/components/PartidoForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { PartidoService } from "../services/PartidoService";
import { Partido } from "../models/Partido";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  nombre: string;
  sigla: string;
  color: string;
};

export const PartidoForm = () => {
  const navigate = useNavigate();
  useAuth();
  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Carga datos si estamos editando
  useEffect(() => {
    if (id) {
      new PartidoService()
        .getPartido(id)
        .then((data) => {
          reset({
            nombre: data.nombre,
            sigla: data.sigla,
            color: data.color,
          });
        })
        .catch((error) => console.error("Error cargando partido:", error));
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const partido: Partido = {
      id: id ?? "",
      nombre: data.nombre,
      sigla: data.sigla,
      color: data.color,
    };

    const service = new PartidoService();
    const action = id
      ? service.updatePartido(partido)
      : service.insertPartido({ nombre: data.nombre, sigla: data.sigla, color: data.color });

    action
      .then(() => navigate(URLS.PARTIDOS.LIST))
      .catch((error) => {
        console.error("Error guardando partido:", error);
        alert("Hubo un error al guardar el partido. Intenta nuevamente.");
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title={id ? "Editar Partido" : "Crear Partido"} className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="nombre">Nombre:</label>
              <Input id="nombre" {...register("nombre", { required: true })} />
              {errors.nombre && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="sigla">Sigla:</label>
              <Input id="sigla" {...register("sigla", { required: true })} />
              {errors.sigla && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="color">Color:</label>
              <Input id="color" {...register("color", { required: true })} />
              {errors.color && <span>Este campo es requerido</span>}
            </FormField>

            <Button type="submit" title="Guardar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
