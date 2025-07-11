// src/components/RecintoList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { RecintoService } from "../services/RecintoService";
import { Recinto } from "../models/Recinto";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const RecintoList = () => {
  const navigate = useNavigate();
  useAuth();

  const [recintos, setRecintos] = useState<Recinto[]>([]);

  const fetchRecintos = () => {
    new RecintoService()
      .getRecintos()
      .then((response) => setRecintos(response))
      .catch((error) => console.error("Error al obtener los recintos:", error));
  };

  useEffect(() => {
    fetchRecintos();
  }, []);

  const deleteRecinto = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este recinto?")) return;
    new RecintoService()
      .deleteRecinto(id)
      .then(fetchRecintos)
      .catch((error) => console.error("Error al eliminar el recinto:", error));
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Recintos">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Sección (ID)</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recintos.map((r) => (
                <tr key={r.id}>
                  <td className="text-center border-t-1 border-gray-300">{r.id}</td>
                  <td className="text-center border-t-1 border-gray-300">{r.nombre}</td>
                  <td className="text-center border-t-1 border-gray-300">{r.ubicacion}</td>
                  <td className="text-center border-t-1 border-gray-300">{r.seccion}</td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() => navigate(URLS.RECINTOS.UPDATE(r.id))}
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deleteRecinto(r.id)}
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

export default RecintoList;