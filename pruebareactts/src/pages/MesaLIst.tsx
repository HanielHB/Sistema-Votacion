// src/components/MesaList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { MesaService } from "../services/MesaService";
import { Mesa } from "../models/Mesa";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const MesaList = () => {
    const navigate = useNavigate();
    useAuth();

    const [mesas, setMesas] = useState<Mesa[]>([]);

    const fetchMesas = () => {
        new MesaService()
        .getMesas()
        .then((response) => setMesas(response))
        .catch((error) => console.error("Error al obtener las mesas:", error));
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    const deleteMesa = (id: string) => {
        if (!window.confirm("¿Está seguro de que desea eliminar esta mesa?"))
        return;
        new MesaService()
        .deleteMesa(id)
        .then(fetchMesas)
        .catch((error) => console.error("Error al eliminar la mesa:", error));
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title="Lista de Mesas">
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Número</th>
                    <th>Recinto (ID)</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {mesas.map((mesa) => (
                    <tr key={mesa.id}>
                    <td className="text-center border-t-1 border-gray-300">
                        {mesa.id}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        {mesa.numero}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        {mesa.recinto}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        <Button
                        onClick={() => navigate(URLS.MESAS.UPDATE(mesa.id))}
                        variant="primary"
                        title="Editar"
                        />
                    </td>
                    <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                        <Button
                        onClick={() => deleteMesa(mesa.id)}
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

export default MesaList;
