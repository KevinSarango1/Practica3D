'use client';
import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const GaleriaPage = () => {
    const [productos, setProductos] = useState([
        {
            nombre: 'Leche',
            marca: 'Gloria',
            codigo: 'ABC123',
            descripcion: 'Leche Gloria',
            cantidad_stock: 100,
            estado: 'A PUNTO DE CADUCAR',
            imagen: null
        },
        {
            nombre: 'Atún',
            marca: 'Isabel',
            codigo: 'ABC122',
            descripcion: 'Atún Isabel',
            cantidad_stock: 100,
            estado: 'A PUNTO DE CADUCAR',
            imagen: null
        },
        {
            nombre: 'Galletas Amor',
            marca: 'Amor',
            codigo: 'ABC124',
            descripcion: 'Galletas de vainilla',
            cantidad_stock: 100,
            estado: 'BUENO',
            imagen: null
        },
        {
            nombre: 'Deshodorante',
            marca: 'Rexona',
            codigo: 'ABC125',
            descripcion: 'Deshodorante hombres',
            cantidad_stock: 100,
            estado: 'BUENO',
            imagen: null
        },
        {
            nombre: 'Aceite',
            marca: 'La Favorita',
            codigo: 'abc12346',
            descripcion: 'Aceite vegetal',
            cantidad_stock: 100,
            estado: 'BUENO',
            imagen: null
        },
        {
            nombre: 'Arroz',
            marca: 'Macareño',
            codigo: 'abc1237',
            descripcion: 'Arroz blanco',
            cantidad_stock: 100,
            estado: 'BUENO',
            imagen: null
        },
        {
            nombre: 'Maíz',
            marca: 'Agripac',
            codigo: 'abc12348',
            descripcion: 'Maíz dulce',
            cantidad_stock: 50,
            estado: 'A PUNTO DE CADUCAR',
            imagen: null
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProducto(null);
    };

    const handleShowModal = (index) => {
        setSelectedProducto(index);
        setShowModal(true);
    };

    const handleImagenChange = (e, productoIndex) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                const updatedProductos = [...productos];
                updatedProductos[productoIndex].imagen = imageDataUrl;
                setProductos(updatedProductos);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Galería de Productos</h1>
            <div className="row">
                {productos.map((producto, index) => (
                    <div key={index} className="col-md-4 mb-3">
                        <Card>
                            {producto.imagen ? (
                                <Card.Img variant="top" src={producto.imagen} style={{ height: '200px', objectFit: 'cover' }} />
                            ) : (
                                <Card.Img variant="top" src="https://via.placeholder.com/300x200" style={{ height: '200px', objectFit: 'cover' }} />
                            )}
                            <Card.Body>
                                <Card.Title>{producto.nombre}</Card.Title>
                                <Card.Text>
                                    <strong>Marca:</strong> {producto.marca}<br />
                                    <strong>Código:</strong> {producto.codigo}<br />
                                    <strong>Descripción:</strong> {producto.descripcion}<br />
                                    <strong>Cantidad en Stock:</strong> {producto.cantidad_stock}<br />
                                    <strong>Estado:</strong> {producto.estado}<br />
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleShowModal(index)}>Subir Imagen</Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {selectedProducto !== null && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Subir Imagen para {productos[selectedProducto].nombre}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId={`formImagen${selectedProducto}`}>
                            <Form.Label>Seleccionar Imagen</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={(e) => handleImagenChange(e, selectedProducto)} />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" onClick={handleCloseModal}>Aceptar</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default GaleriaPage;
