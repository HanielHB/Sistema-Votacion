// src/components/RecintoForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { RecintoService } from "../services/RecintoService";
import { SeccionService } from "../services/SeccionService";
import { Recinto } from "../models/Recinto";
import { Seccion } from "../models/Seccion";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  nombre: string;
  ubicacion: string;
  seccion: string;
};

export const RecintoForm = () => {
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

  // Cargar secciones para el select
  useEffect(() => {
    new SeccionService()
      .getSecciones()
      .then((data) => setSecciones(data))
      .catch((error) => console.error("Error cargando secciones:", error));
  }, []);

  // Cargar datos si es edición
  useEffect(() => {
    if (id) {
      new RecintoService()
        .getRecinto(id)
        .then((data) => {
          reset({
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            seccion: data.seccion.toString(),
          });
        })
        .catch((error) => console.error("Error cargando recinto:", error));
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const recinto: Recinto = {
      id: id ?? "",
      nombre: data.nombre,
      ubicacion: data.ubicacion,
      seccion: Number(data.seccion),
    };

    const service = new RecintoService();
    const action = id
      ? service.updateRecinto(recinto)
      : service.insertRecinto({ nombre: data.nombre, ubicacion: data.ubicacion, seccion: Number(data.seccion) });

    action
      .then(() => navigate(URLS.RECINTOS.LIST))
      .catch((error) => {
        console.error("Error al guardar recinto:", error);
        alert("Hubo un error al guardar el recinto. Intenta nuevamente.");
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title={id ? "Editar Recinto" : "Crear Recinto"} className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="nombre">Nombre:</label>
              <Input id="nombre" {...register("nombre", { required: true })} />
              {errors.nombre && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="ubicacion">Ubicación:</label>
              <Input id="ubicacion" {...register("ubicacion", { required: true })} />
              {errors.ubicacion && <span>Este campo es requerido</span>}
            </FormField>

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

            <Button type="submit" title="Guardar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
