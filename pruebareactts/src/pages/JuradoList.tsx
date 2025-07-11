// src/components/JuradoList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { JuradoService } from "../services/JuradoService";
import { Jurado } from "../models/Jurado";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const JuradoList = () => {
  const navigate = useNavigate();
  useAuth();

  const [jurados, setJurados] = useState<Jurado[]>([]);

  const fetchJurados = () => {
    new JuradoService()
      .getJurados()
      .then((response) => setJurados(response))
      .catch((error) => console.error("Error al obtener los jurados:", error));
  };

  useEffect(() => {
    fetchJurados();
  }, []);

  const deleteJurado = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este jurado?")) return;
    new JuradoService()
      .deleteJurado(id)
      .then(fetchJurados)
      .catch((error) => console.error("Error al eliminar el jurado:", error));
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Jurados">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Mesa</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {jurados.map((j) => (
                <tr key={j.id}>
                  <td className="text-center border-t-1 border-gray-300">{j.id}</td>
                  <td className="text-center border-t-1 border-gray-300">{j.ci}</td>
                  <td className="text-center border-t-1 border-gray-300">{j.nombre}</td>
                  <td className="text-center border-t-1 border-gray-300">{j.apellidoPaterno}</td>
                  <td className="text-center border-t-1 border-gray-300">{j.apellidoMaterno}</td>
                  <td className="text-center border-t-1 border-gray-300">{j.mesa}</td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() => navigate(URLS.JURADOS.UPDATE(j.id))}
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deleteJurado(j.id)}
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

export default JuradoList;
