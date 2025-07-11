import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { VotanteService } from "../services/VotanteService";
import { Votante } from "../models/Votante";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const VotanteList = () => {
    const navigate = useNavigate();
    useAuth();

    const [votantes, setVotantes] = useState<Votante[]>([]);

    const fetchVotantes = () => {
        new VotanteService()
        .getVotantes()
        .then((response) => setVotantes(response))
        .catch((error) => console.error("Error al obtener los votantes:", error));
    };

    useEffect(() => {
        fetchVotantes();
    }, []);

    const deleteVotante = (id: string) => {
        if (!window.confirm("¿Está seguro de que desea eliminar este votante?")) return;
        new VotanteService()
        .deleteVotante(id)
        .then(fetchVotantes)
        .catch((error) => console.error("Error al eliminar el votante:", error));
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title="Lista de Votantes">
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
                {votantes.map((v) => (
                    <tr key={v.id}>
                    <td className="text-center border-t-1 border-gray-300">{v.id}</td>
                    <td className="text-center border-t-1 border-gray-300">{v.ci}</td>
                    <td className="text-center border-t-1 border-gray-300">{v.nombre}</td>
                    <td className="text-center border-t-1 border-gray-300">{v.apellidoPaterno}</td>
                    <td className="text-center border-t-1 border-gray-300">{v.apellidoMaterno}</td>
                    <td className="text-center border-t-1 border-gray-300">{v.mesa ?? "--"}</td>
                    <td className="text-center border-t-1 border-gray-300">
                        <Button
                        onClick={() => navigate(URLS.VOTANTES.UPDATE(v.id.toString()))}
                        variant="primary"
                        title="Editar"
                        />
                    </td>
                    <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                        <Button
                        onClick={() => deleteVotante(v.id.toString())}
                        variant="danger"
                        title="Eliminar"
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

export default VotanteList;