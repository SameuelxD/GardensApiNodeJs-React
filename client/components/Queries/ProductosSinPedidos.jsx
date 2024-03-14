import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ProductosSinPedidos({ userData }) {
    const [productosSinPedidosList, setProductosSinPedidosList] = useState([]);

    useEffect(() => {
        listProductosSinPedidos();
    }, []);

    const listProductosSinPedidos = () => {
        axios.get("http://localhost:3001/api/ProductosSinPedidos", {
            withCredentials: true
        })
            .then((response) => {
                setProductosSinPedidosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ProductosSinPedidos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Productos sin Pedidos</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Gama</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Descripcion Texto</th>
                    </tr>
                </thead>
                <tbody>
                    {productosSinPedidosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_producto}</td>
                                <td>{val.nombre}</td>
                                <td>{val.gama}</td>
                                <td>{val.descripcion}</td>
                                <td>{val.descripcion_texto}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductosSinPedidos;
