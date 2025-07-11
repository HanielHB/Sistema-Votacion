// src/components/CargoList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { CargoService } from "../services/CargoService";
import { Cargo } from "../models/Cargo";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const CargoList = () => {
  const navigate = useNavigate();
  useAuth();

  const [cargos, setCargos] = useState<Cargo[]>([]);

  const fetchCargos = () => {
    new CargoService()
      .getCargos()
      .then(setCargos)
      .catch((error) => console.error("Error al obtener los cargos:", error));
  };

  useEffect(() => {
    fetchCargos();
  }, []);

  const deleteCargo = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este cargo?")) return;
    new CargoService()
      .deleteCargo(id)
      .then(fetchCargos)
      .catch((error) => console.error("Error al eliminar el cargo:", error));
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Cargos">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Secciones Afectadas</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cargos.map((c) => (
                <tr key={c.id}>
                  <td className="text-center border-t-1 border-gray-300">{c.id}</td>
                  <td className="text-center border-t-1 border-gray-300">{c.nombre}</td>
                  <td className="text-center border-t-1 border-gray-300">
                    {c.seccionesAfectadas.join(", ") || "--"}
                  </td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() => navigate(URLS.CARGOS.UPDATE(c.id))}
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deleteCargo(c.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

export default CargoList;
