'use client';

import { useEffect, useState } from 'react';
import { listar_personas } from '../hooks/Services_persona';
import Menu from '../components/menu/menu'; // Asegúrate de ajustar la ruta según tu estructura de carpetas

const PersonasPage = () => {
    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        const fetchPersonas = async () => {
            try {
                const response = await listar_personas();
                if (response && response.datos) {
                    setPersonas(response.datos);
                } else {
                    console.error("Error al listar personas:", response);
                }
            } catch (error) {
                console.error("Error al obtener datos de personas:", error);
            }
        };

        fetchPersonas();
    }, []);

    const modificarPersona = (external_id) => {
        window.location.href = `/personas/modificar/${external_id}`;
    };

    return (
        <div>
            <Menu />
            <h1>Listado de Personas</h1>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Identificación</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.external_id}>
                            <td>{persona.nombres}</td>
                            <td>{persona.apellidos}</td>
                            <td>{persona.identificacion}</td>
                            <td>{persona.rol.nombre}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => modificarPersona(persona.external_id)}>Modificar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PersonasPage;
