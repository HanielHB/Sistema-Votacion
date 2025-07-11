// src/components/CandidatoForm.tsx
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { FormField } from "../components/FormField";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { CandidatoService } from "../services/CandidatoService";
import { Candidato } from "../models/Candidato";
import { PartidoService } from "../services/PartidoService";
import { Partido } from "../models/Partido";
import { CargoService } from "../services/CargoService";
import { Cargo } from "../models/Cargo";
import { useNavigate, useParams } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
  nombre: string;
  partido: string;
  cargo: string;
};

export const CandidatoForm = () => {
  const navigate = useNavigate();
  useAuth();

  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [partidos, setPartidos] = useState<Partido[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);

  // Cargar partidos y cargos para los selects
  useEffect(() => {
    new PartidoService()
      .getPartidos()
      .then(setPartidos)
      .catch((err) => console.error("Error cargando partidos:", err));

    new CargoService()
      .getCargos()
      .then(setCargos)
      .catch((err) => console.error("Error cargando cargos:", err));
  }, []);

  // Cargar datos si estamos en modo edición
  useEffect(() => {
    if (!id) return;
    new CandidatoService()
      .getCandidato(id)
      .then((data) => {
        reset({
          nombre: data.nombre,
          partido: data.partido.toString(),
          cargo: data.cargo.toString(),
        });
      })
      .catch((err) => console.error("Error cargando candidato:", err));
  }, [id, reset]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const candidato: Candidato = {
      id: id ?? "",
      nombre: data.nombre,
      partido: parseInt(data.partido, 10),
      cargo: parseInt(data.cargo, 10),
    };

    const service = new CandidatoService();
    const action = id
      ? service.updateCandidato(candidato)
      : service.insertCandidato(candidato);

    action
      .then(() => navigate(URLS.CANDIDATOS.LIST))
      .catch((err) => {
        console.error("Error guardando candidato:", err);
        alert("Hubo un error al guardar el candidato. Intenta nuevamente.");
      });
  };

    return (
        <>
        <Menu />
        <Container>
            <Card
            title={id ? "Editar Candidato" : "Crear Candidato"}
            className="mx-5 my-5"
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                <label htmlFor="nombre">Nombre:</label>
                <Input
                    id="nombre"
                    {...register("nombre", { required: true })}
                />
                {errors.nombre && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="partido">Partido:</label>
                <select
                    id="partido"
                    {...register("partido", { required: true })}
                    className="border rounded p-2"
                >
                    <option value="">-- Seleccione partido --</option>
                    {partidos.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.nombre}
                    </option>
                    ))}
                </select>
                {errors.partido && <span>Este campo es requerido</span>}
                </FormField>

                <FormField>
                <label htmlFor="cargo">Cargo:</label>
                <select
                    id="cargo"
                    {...register("cargo", { required: true })}
                    className="border rounded p-2"
                >
                    <option value="">-- Seleccione cargo --</option>
                    {cargos.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>
                    ))}
                </select>
                {errors.cargo && <span>Este campo es requerido</span>}
                </FormField>

                <Button type="submit" title="Guardar" />
            </form>
            </Card>
        </Container>
        </>
    );
};
