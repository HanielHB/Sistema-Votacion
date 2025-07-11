// src/components/EleccionList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { EleccionService } from "../services/EleccionService";
import { Eleccion } from "../models/Eleccion";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const EleccionList = () => {
  const navigate = useNavigate();
  useAuth();

  const [elecciones, setElecciones] = useState<Eleccion[]>([]);

  const fetchElecciones = () => {
    new EleccionService()
      .getElecciones()
      .then((response) => setElecciones(response))
      .catch((error) => console.error("Error al obtener las elecciones:", error));
  };

  useEffect(() => {
    fetchElecciones();
  }, []);

  const deleteEleccion = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar esta elección?")) return;
    new EleccionService()
      .deleteEleccion(id)
      .then(fetchElecciones)
      .catch((error) => console.error("Error al eliminar la elección:", error));
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Elecciones">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {elecciones.map((e) => (
                <tr key={e.id}>
                  <td className="text-center border-t-1 border-gray-300">{e.id}</td>
                  <td className="text-center border-t-1 border-gray-300">{e.tipo}</td>
                  <td className="text-center border-t-1 border-gray-300">{e.fecha}</td>
                  <td className="text-center border-t-1 border-gray-300">{e.descripcion}</td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() => navigate(URLS.ELECCIONES.UPDATE(e.id))}
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deleteEleccion(e.id)}
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

export default EleccionList;
