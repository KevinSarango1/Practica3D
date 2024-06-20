'use client'
import { useEffect, useState } from 'react';
//import { obtener_persona_por_external_id } from '../hooks/Services_persona';

const PersonaDetailPage = ({ external_id }) => {
    const [persona, setPersona] = useState(null);

    useEffect(() => {
        const fetchPersona = async () => {
            const response = await obtener_persona_por_external_id(external_id);
            setPersona(response.datos);
        };

        fetchPersona();
    }, [external_id]);

    if (!persona) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1>Detalles de Persona</h1>
            <p>Nombres: {persona.nombres}</p>
            <p>Apellidos: {persona.apellidos}</p>
            <p>Identificación: {persona.identificacion}</p>
            <p>Rol: {persona.rol.nombre}</p> {/* Asegúrate de acceder correctamente a la propiedad 'nombre' del objeto 'rol' */}
        </div>
    );
};

export default PersonaDetailPage;
