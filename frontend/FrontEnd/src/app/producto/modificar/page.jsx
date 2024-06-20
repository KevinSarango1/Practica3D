'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { obtener_producto_por_external_id, modificar_producto } from '../../hooks/Service_producto';
const ModificarProductoPage = () => {
    const router = useRouter();
    const { external_id } = router.query;
    const [producto, setProducto] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        marca: '',
        codigo: '',
        descripcion: '',
        cantidad_stock: '',
        estado: ''
    });

    useEffect(() => {
        if (external_id) {
            const fetchProducto = async () => {
                const response = await obtener_producto_por_external_id(external_id);
                setProducto(response.datos);
                setFormData(response.datos);
            };

            fetchProducto();
        }
    }, [external_id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await modificar_producto(external_id, formData);
        router.push('/producto');
    };

    if (!producto) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Modificar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <input
                        type="text"
                        name="marca"
                        value={formData.marca}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Código:</label>
                    <input
                        type="text"
                        name="codigo"
                        value={formData.codigo}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Cantidad en Stock:</label>
                    <input
                        type="number"
                        name="cantidad_stock"
                        value={formData.cantidad_stock}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Estado:</label>
                    <select
                        name="estado"
                        value={formData.estado}
                        onChange={handleInputChange}
                    >
                        <option value="BUENO">BUENO</option>
                        <option value="A_PUNTO_DE_CADUCAR">A PUNTO DE CADUCAR</option>
                        <option value="CADUCADO">CADUCADO</option>
                    </select>
                </div>
                <button type="submit">Modificar</button>
            </form>
        </div>
    );
};

export default ModificarProductoPage;
