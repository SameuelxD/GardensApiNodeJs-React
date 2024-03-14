import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ProductoMasVendido({ userData }) {
    const [productoMasVendidoList, setProductoMasVendidoList] = useState([]);

    useEffect(() => {
        listProductoMasVendido();
    }, []);

    const listProductoMasVendido = () => {
        axios.get("http://localhost:3001/api/ProductoMasVendido", {
            withCredentials: true
        })
            .then((response) => {
                setProductoMasVendidoList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista del ProductoMasVendido ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title' >Informacion Producto mas Vendido</h2>
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
                    {productoMasVendidoList.map((val, key) => {
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

export default ProductoMasVendido;
