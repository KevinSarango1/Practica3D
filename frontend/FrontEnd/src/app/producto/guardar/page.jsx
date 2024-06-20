'use client';
import React, { useState } from 'react';
import Menu from '../../components/menu/menu';
import { guardar_producto } from '../../hooks/Service_producto';
import 'bootstrap/dist/css/bootstrap.min.css';

const GuardarProductoPage = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        fecha_fabricacion: '',
        fecha_expiracion: '',
        cantidad_stock: '',
        marca: '',
        codigo: '',
        descripcion: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cantidadStock = parseInt(formData.cantidad_stock);
            const dataToSend = {
                ...formData,
                cantidad_stock: cantidadStock
            };

            const response = await guardar_producto(dataToSend);
            console.log(response);
        } catch (error) {
            console.error('Error al guardar producto:', error);
        }
    };

    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <h1 className="mb-4">Guardar Producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fecha_fabricacion" className="form-label">Fecha de Fabricación:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fecha_fabricacion"
                            name="fecha_fabricacion"
                            value={formData.fecha_fabricacion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="fecha_expiracion" className="form-label">Fecha de Expiración:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fecha_expiracion"
                            name="fecha_expiracion"
                            value={formData.fecha_expiracion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cantidad_stock" className="form-label">Cantidad en Stock:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cantidad_stock"
                            name="cantidad_stock"
                            value={formData.cantidad_stock}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="marca" className="form-label">Marca:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="marca"
                            name="marca"
                            value={formData.marca}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="codigo" className="form-label">Código:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="codigo"
                            name="codigo"
                            value={formData.codigo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar Producto</button>
                </form>
            </div>
        </div>
    );
};

export default GuardarProductoPage;
