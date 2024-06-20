'use client';
import { useEffect, useState } from 'react';
import { listar_productos } from '../hooks/Service_producto';
import Menu from '../components/menu/menu'; // Ajusta la ruta según la ubicación real de tu componente Menu
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchProductos = async () => {
            const response = await listar_productos();
            setProductos(response.datos);
        };

        fetchProductos();
    }, []);

    const modificarProducto = (external_id) => {
        router.push(`/producto/modificar/${external_id}`);
    };

    const añadirProducto = () => {
        router.push('/producto/guardar');
    };

    return (
        <div>
            <Menu />
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1>Listado de Productos</h1>
                    <button className="btn btn-primary" onClick={añadirProducto}>Añadir Producto</button>
                </div>
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Marca</th>
                            <th>Código</th>
                            <th>Descripción</th>
                            <th>Cantidad en Stock</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.external_id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.marca}</td>
                                <td>{producto.codigo}</td>
                                <td>{producto.descripcion}</td>
                                <td>{producto.cantidad_stock}</td>
                                <td>{producto.estado}</td>
                                <td>
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={() => modificarProducto(producto.external_id)}
                                    >
                                        Modificar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductosPage;
