// src/navigation/RouterConfig.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router";
import { URLS } from "./CONTANTS";

import { LoginForm } from "../pages/LoginForm";
import { RegisterForm } from "../pages/RegisterForm";

import VotanteList from "../pages/votanteList";
import { VotanteForm } from "../pages/VotanteForm";

import SeccionList from "../pages/SeccionList";
import { SeccionForm } from "../pages/SeccionForm";

import RecintoList from "../pages/RecientoList";
import { RecintoForm } from "../pages/RecintoForm";

import PartidoList from "../pages/PartidoList";
import { PartidoForm } from "../pages/PartidoForm";

import PapeletaList from "../pages/PapeletaList";
import { PapeletaForm } from "../pages/PapeletaForm";

import JuradoList from "../pages/JuradoList";
import { JuradoForm } from "../pages/JuradoForm";

import EleccionList from "../pages/EleccionList";
import { EleccionForm } from "../pages/EleccionesForm";

import CargoList from "../pages/CargoList";
import { CargoForm } from "../pages/CargoForm";

import CandidatoList from "../pages/CandidatoList";
import { CandidatoForm } from "../pages/CandidatoForm";
import MesaList from "../pages/MesaLIst";
import { MesaForm } from "../pages/MesaForm";

const RouterConfig = () => (
    <Routes>
        {/* Home redirige a la lista de votantes */}
        <Route
            path={URLS.HOME}
            element={<Navigate to={URLS.VOTANTES.LIST} replace />}
        />

        {/* Autenticación */}
        <Route path={URLS.LOGIN} element={<LoginForm />} />
        <Route path={URLS.REGISTER} element={<RegisterForm />} />

        {/* Votantes */}
        <Route path={URLS.VOTANTES.LIST} element={<VotanteList />} />
        <Route path={URLS.VOTANTES.CREATE} element={<VotanteForm />} />
        <Route path={URLS.VOTANTES.EDIT} element={<VotanteForm />} />

        {/* Mesas */}
        <Route path={URLS.MESAS.LIST} element={<MesaList/>} />
        <Route path={URLS.MESAS.CREATE} element={<MesaForm />} />
        <Route path={URLS.MESAS.EDIT} element={<MesaForm />} />

        {/* Secciones */}
        <Route path={URLS.SECCIONES.LIST} element={<SeccionList />} />
        <Route path={URLS.SECCIONES.CREATE} element={<SeccionForm />} />
        <Route path={URLS.SECCIONES.EDIT} element={<SeccionForm />} />

        {/* Recintos */}
        <Route path={URLS.RECINTOS.LIST} element={<RecintoList />} />
        <Route path={URLS.RECINTOS.CREATE} element={<RecintoForm />} />
        <Route path={URLS.RECINTOS.EDIT} element={<RecintoForm />} />

        {/* Partidos */}
        <Route path={URLS.PARTIDOS.LIST} element={<PartidoList />} />
        <Route path={URLS.PARTIDOS.CREATE} element={<PartidoForm />} />
        <Route path={URLS.PARTIDOS.EDIT} element={<PartidoForm />} />

        {/* Papeletas */}
        <Route path={URLS.PAPELETAS.LIST} element={<PapeletaList />} />
        <Route path={URLS.PAPELETAS.CREATE} element={<PapeletaForm />} />
        <Route path={URLS.PAPELETAS.EDIT} element={<PapeletaForm />} />

        {/* Jurados */}
        <Route path={URLS.JURADOS.LIST} element={<JuradoList />} />
        <Route path={URLS.JURADOS.CREATE} element={<JuradoForm />} />
        <Route path={URLS.JURADOS.EDIT} element={<JuradoForm />} />

        {/* Elecciones */}
        <Route path={URLS.ELECCIONES.LIST} element={<EleccionList />} />
        <Route path={URLS.ELECCIONES.CREATE} element={<EleccionForm />} />
        <Route path={URLS.ELECCIONES.EDIT} element={<EleccionForm />} />

        {/* Cargos */}
        <Route path={URLS.CARGOS.LIST} element={<CargoList />} />
        <Route path={URLS.CARGOS.CREATE} element={<CargoForm />} />
        <Route path={URLS.CARGOS.EDIT} element={<CargoForm />} />

        {/* Candidatos */}
        <Route path={URLS.CANDIDATOS.LIST} element={<CandidatoList />} />
        <Route path={URLS.CANDIDATOS.CREATE} element={<CandidatoForm />} />
        <Route path={URLS.CANDIDATOS.EDIT} element={<CandidatoForm />} />
    </Routes>
);

export default RouterConfig;
