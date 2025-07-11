import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { SeccionService } from "../services/SeccionService";
import { Seccion } from "../models/Seccion";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const SeccionList = () => {
    const navigate = useNavigate();
    useAuth();

    const [secciones, setSecciones] = useState<Seccion[]>([]);

    const fetchSecciones = () => {
        new SeccionService()
        .getSecciones()
        .then((response) => setSecciones(response))
        .catch((error) =>
            console.error("Error al obtener las secciones:", error)
        );
    };

    useEffect(() => {
        fetchSecciones();
    }, []);

    const deleteSeccion = (id: string) => {
        if (!window.confirm("¿Está seguro de que desea eliminar esta sección?"))
        return;
        new SeccionService()
        .deleteSeccion(id)
        .then(fetchSecciones)
        .catch((error) => console.error("Error al eliminar la sección:", error));
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title="Lista de Secciones">
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Coordenadas Mapa</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {secciones.map((sec) => (
                    <tr key={sec.id}>
                    <td className="text-center border-t-1 border-gray-300">
                        {sec.id}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        {sec.nombre}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        {sec.coordenadasMapa}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        <Button
                        variant="primary"
                        title="Editar"
                        onClick={() => navigate(URLS.SECCIONES.UPDATE(sec.id))}
                        />
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        <Button
                        variant="danger"
                        title="Eliminar"
                        onClick={() => deleteSeccion(sec.id)}
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

export default SeccionList;
