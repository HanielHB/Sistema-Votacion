// src/components/PapeletaList.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONTANTS";
import { PapeletaService } from "../services/PapeletaService";
import { Papeleta } from "../models/Papeleta";
import { Menu } from "../components/Menu";
import { Container } from "../components/Container";
import { useAuth } from "../hooks/useAuth";

const PapeletaList = () => {
    const navigate = useNavigate();
    useAuth();

    const [papeletas, setPapeletas] = useState<Papeleta[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPapeletas = (pageNum = 1) => {
        new PapeletaService()
        .getPapeletas(pageNum)
        .then((pageData) => {
            setPapeletas(pageData.results);
            // calcular totalPages a partir de count
            const pages = Math.ceil(pageData.count / pageData.results.length);
            setTotalPages(pages);
        })
        .catch((error) => console.error("Error al obtener las papeletas:", error));
    };

    useEffect(() => {
        fetchPapeletas(page);
    }, [page]);

    const deletePapeleta = (id: string) => {
        if (!window.confirm("¿Está seguro de que desea eliminar esta papeleta?"))
        return;
        new PapeletaService()
        .deletePapeleta(id)
        .then(() => fetchPapeletas(page))
        .catch((error) => console.error("Error al eliminar la papeleta:", error));
    };

    return (
        <>
        <Menu />
        <Container>
            <Card title="Lista de Papeletas">
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Sección (ID)</th>
                    <th>Archivo</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {papeletas.map((p) => (
                    <tr key={p.id}>
                    <td className="text-center border-t-1 border-gray-300">
                        {p.id}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        {p.seccion}
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        <a
                        href={p.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Ver archivo
                        </a>
                    </td>
                    <td className="text-center border-t-1 border-gray-300">
                        <Button
                        variant="primary"
                        title="Editar"
                        onClick={() =>
                            navigate(URLS.PAPELETAS.UPDATE(p.id.toString()))
                        }
                        />
                    </td>
                    <td className="px-3 py-3 text-center border-t-1 border-gray-300">
                        <Button
                        variant="danger"
                        title="Eliminar"
                        onClick={() => deletePapeleta(p.id.toString())}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Paginación simple */}
            <div className="flex justify-between mt-4">
                <Button
                title="Anterior"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                />
                <span>
                Página {page} de {totalPages}
                </span>
                <Button
                title="Siguiente"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                />
            </div>
            </Card>
        </Container>
        </>
    );
};

export default PapeletaList;
