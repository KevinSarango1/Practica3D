'use client';

import { useState, useEffect } from 'react';
import { guardar_archivo } from '@/app/hooks/Services_persona';
import axios from 'axios';
import Cookies from "js-cookie";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [imagenes, setImagenes] = useState([]);

    useEffect(() => {
        const fetchImagenes = async () => {
            try {
                const response = await axios.get('/persona/imagenes');
                if (response.data && Array.isArray(response.data)) {
                    setImagenes(response.data);
                } else {
                    console.error('Unexpected response data:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch images', error);
                setMessage('Failed to fetch images. Please try again later.');
            }
        };

        fetchImagenes();
    }, []);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('imagen', file);
        formData.append('persona_id', '1'); // Replace with the appropriate persona ID

        try {
            const response = await guardar_archivo(formData);
            if (response && response.code === 200) {
                setMessage('File uploaded successfully');
                const nuevaImagen = {
                    id: response.datos.id,
                    persona_id: '1',
                    nombre_archivo: file.name,
                    estado: true,
                    external_id: response.datos.external_id,
                    tipo_archivo: 'imagen'
                };
                setImagenes([...imagenes, nuevaImagen]);
            } else {
                setMessage('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setMessage('Failed to upload file');
        }
    };

    const close = () => {
        Cookies.remove('token');
        Cookies.remove('usuario');
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" href="/">My App</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" href="/about">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/services">Services</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/contacts">Contacts</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/sessions" onClick={close}>Close</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container mt-5">
                <h1 className="mb-4">Cargar Imagen</h1>
                <form onSubmit={handleSubmit} className="bg-light p-5 rounded shadow">
                    <div className="mb-4">
                        <input type="file" onChange={handleFileChange} className="form-control" />
                    </div>
                    <button type="submit" className="btn btn-primary">Upload</button>
                </form>
                {message && <div className="alert alert-info mt-4">{message}</div>}
                <h2 className="mt-5">Imagenes Guardadas</h2>
                <div className="row mt-4">
                    {imagenes.map((imagen, index) => (
                        imagen && (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={`/Archivos/${imagen.nombre_archivo}`} alt={`Imagen ${imagen.id}`} className="card-img-top" />
                                    <div className="card-body">
                                        <p className="card-text">ID: {imagen.id}</p>
                                        <p className="card-text">Persona ID: {imagen.persona_id}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </main>
        </div>
    );
}
