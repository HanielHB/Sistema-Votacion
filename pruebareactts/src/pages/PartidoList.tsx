// src/components/PartidoList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { PartidoService } from "../services/PartidoService";
import { Partido } from "../models/Partido";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const PartidoList = () => {
  const navigate = useNavigate();
  useAuth();

  const [partidos, setPartidos] = useState<Partido[]>([]);

  const fetchPartidos = () => {
    new PartidoService()
      .getPartidos()
      .then((response) => setPartidos(response))
      .catch((error) => console.error("Error al obtener los partidos:", error));
  };

  useEffect(() => {
    fetchPartidos();
  }, []);

  const deletePartido = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este partido?")) return;
    new PartidoService()
      .deletePartido(id)
      .then(fetchPartidos)
      .catch((error) => console.error("Error al eliminar el partido:", error));
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Partidos">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Sigla</th>
                <th>Color</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {partidos.map((p) => (
                <tr key={p.id}>
                  <td className="text-center border-t-1 border-gray-300">{p.id}</td>
                  <td className="text-center border-t-1 border-gray-300">{p.nombre}</td>
                  <td className="text-center border-t-1 border-gray-300">{p.sigla}</td>
                  <td className="text-center border-t-1 border-gray-300">{p.color}</td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() => navigate(URLS.PARTIDOS.UPDATE(p.id))}
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deletePartido(p.id)}
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

export default PartidoList;
