// src/components/CandidatoList.tsx
import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { CandidatoService } from "../services/CandidatoService";
import { Candidato } from "../models/Candidato";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const CandidatoList = () => {
  const navigate = useNavigate();
  useAuth();

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  const fetchCandidatos = () => {
    new CandidatoService()
      .getCandidatos()
      .then((data) => setCandidatos(data))
      .catch((error) =>
        console.error("Error al obtener los candidatos:", error)
      );
  };

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const deleteCandidato = (id: string) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este candidato?"))
      return;
    new CandidatoService()
      .deleteCandidato(id)
      .then(fetchCandidatos)
      .catch((error) =>
        console.error("Error al eliminar el candidato:", error)
      );
  };

  return (
    <>
      <Menu />
      <Container>
        <Card title="Lista de Candidatos">
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Partido</th>
                <th>Cargo</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {candidatos.map((c) => (
                <tr key={c.id}>
                  <td className="text-center border-t-1 border-gray-300">
                    {c.id}
                  </td>
                  <td className="text-center border-t-1 border-gray-300">
                    {c.nombre}
                  </td>
                  <td className="text-center border-t-1 border-gray-300">
                    {c.partido}
                  </td>
                  <td className="text-center border-t-1 border-gray-300">
                    {c.cargo}
                  </td>
                  <td className="text-center border-t-1 border-gray-300">
                    <Button
                      variant="primary"
                      title="Editar"
                      onClick={() =>
                        navigate(URLS.CANDIDATOS.UPDATE(c.id.toString()))
                      }
                    />
                  </td>
                  <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                    <Button
                      variant="danger"
                      title="Eliminar"
                      onClick={() => deleteCandidato(c.id.toString())}
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

export default CandidatoList;
