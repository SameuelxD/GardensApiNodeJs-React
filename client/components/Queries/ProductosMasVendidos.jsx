import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ProductosMasVendidos({ userData }) {
    const [productosMasVendidosList, ProductosMasVendidosList] = useState([]);

    useEffect(() => {
        ProductosMasVendidos();
    }, []);

    const ProductosMasVendidos = () => {
        axios.get("http://localhost:3001/api/ProductosMasVendidos", {
            withCredentials: true
        })
            .then((response) => {
                ProductosMasVendidosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ProductosMasVendidos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion 20 Productos mas vendidos</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Gama</th>
                        <th scope="col">Dimensiones</th>
                        <th scope="col">Proveedor</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Cantidad Vendida</th>
                    </tr>
                </thead>
                <tbody>
                    {productosMasVendidosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_producto}</td>
                                <td>{val.nombre}</td>
                                <td>{val.gama}</td>
                                <td>{val.dimensiones}</td>
                                <td>{val.proveedor}</td>
                                <td>{val.descripcion}</td>
                                <td>{val.cantidad_vendidos}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductosMasVendidos;
