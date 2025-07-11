// src/navigation/CONTANTS.ts
export const URLS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    VOTANTES: {
        LIST: '/votantes',
        CREATE: '/votantes/create',
        EDIT: '/votantes/:id',
        UPDATE: (id: string) => `/votantes/${id}`,
    },
    MESAS: {
        LIST: '/mesa',
        CREATE: '/mesa/create',
        EDIT: '/mesa/:id',
        UPDATE: (id: string) => `/mesa/${id}`,
    },
    SECCIONES: {
        LIST: '/secciones',
        CREATE: '/secciones/create',
        EDIT: '/secciones/:id',
        UPDATE: (id: string) => `/secciones/${id}`,
    },
    RECINTOS: {
        LIST: '/recinto',
        CREATE: '/recinto/create',
        EDIT: '/recinto/:id',
        UPDATE: (id: string) => `/recinto/${id}`,
    },
    PARTIDOS: {
        LIST: '/partidos',
        CREATE: '/partidos/create',
        EDIT: '/partidos/:id',
        UPDATE: (id: string) => `/partidos/${id}`,
    },
    PAPELETAS: {
        LIST: '/papeletas',
        CREATE: '/papeletas/create',
        EDIT: '/papeletas/:id',
        UPDATE: (id: string) => `/papeletas/${id}`,
    },
    JURADOS: {
        LIST: '/jurados',
        CREATE: '/jurados/create',
        EDIT: '/jurados/:id',
        UPDATE: (id: string) => `/jurados/${id}`,
    },
    ELECCIONES: {
        LIST: '/elecciones',
        CREATE: '/elecciones/create',
        EDIT: '/elecciones/:id',
        UPDATE: (id: string) => `/elecciones/${id}`,
    },
    CARGOS: {
        LIST: '/cargos',
        CREATE: '/cargos/create',
        EDIT: '/cargos/:id',
        UPDATE: (id: string) => `/cargos/${id}`,
    },
    CANDIDATOS: {
        LIST: '/candidatos',
        CREATE: '/candidatos/create',
        EDIT: '/candidatos/:id',
        UPDATE: (id: string) => `/candidatos/${id}`,
    },
};
