// src/components/CargoForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { CargoService } from "../services/CargoService";
import { Cargo } from "../models/Cargo";
import { SeccionService } from "../services/SeccionService";
import { Seccion } from "../models/Seccion";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  nombre: string;
  seccionesAfectadas: string[];  // guardamos como strings en el form
};

export const CargoForm = () => {
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

  // Cargar listado de secciones para el select múltiple
  useEffect(() => {
    new SeccionService()
      .getSecciones()
      .then((data) => setSecciones(data))
      .catch((err) => console.error("Error cargando secciones:", err));
  }, []);

  // Si estamos editando, cargar datos del cargo
  useEffect(() => {
    if (!id) return;
    new CargoService()
      .getCargo(id)
      .then((data) => {
        reset({
          nombre: data.nombre,
          seccionesAfectadas: data.seccionesAfectadas.map((s) => s.toString()),
        });
      })
      .catch((err) => console.error("Error cargando cargo:", err));
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const cargo: Cargo = {
      id: id ?? "",
      nombre: data.nombre,
      seccionesAfectadas: data.seccionesAfectadas.map((s) => parseInt(s, 10)),
    };

    const service = new CargoService();
    const action = id
      ? service.updateCargo(cargo)
      : service.insertCargo(cargo);

    action
      .then(() => navigate(URLS.CARGOS.LIST))
      .catch((err) => {
        console.error("Error guardando cargo:", err);
        alert("Hubo un error al guardar el cargo. Intenta nuevamente.");
      });
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title={id ? "Editar Cargo" : "Crear Cargo"} className="mx-5 my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField>
              <label htmlFor="nombre">Nombre del Cargo:</label>
              <Input
                id="nombre"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && <span>Este campo es requerido</span>}
            </FormField>

            <FormField>
              <label htmlFor="seccionesAfectadas">
                Secciones Afectadas:
              </label>
              <select
                id="seccionesAfectadas"
                multiple
                {...register("seccionesAfectadas", { required: true })}
                className="border rounded p-2"
              >
                {secciones.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.nombre}
                  </option>
                ))}
              </select>
              {errors.seccionesAfectadas && (
                <span>Debes asignar al menos una sección</span>
              )}
            </FormField>

            <Button type="submit" title="Guardar" />
          </form>
        </Card>
      </Container>
    </>
  );
};
