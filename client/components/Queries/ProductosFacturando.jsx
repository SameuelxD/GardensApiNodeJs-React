import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ProductosFacturando({ userData }) {
    const [productosFacturandoList, setProductosFacturandoList] = useState([]);

    useEffect(() => {
        listProductosFacturando();
    }, []);

    const listProductosFacturando = () => {
        axios.get("http://localhost:3001/api/ProductosFacturando", {
            withCredentials: true
        })
            .then((response) => {
                setProductosFacturandoList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ProductosFacturando ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Productos Ventas Totales</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Producto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Gama</th>
                        <th scope="col">Unidades Vendidas</th>
                        <th scope="col">Total Facturado sin Impuestos</th>
                        <th scope="col">Total Facturado con Impuestos</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFacturandoList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_producto}</td>
                                <td>{val.nombre}</td>
                                <td>{val.gama}</td>
                                <td>{val.unidades_vendidas}</td>
                                <td>{val.total_facturado_sin_iva}</td>
                                <td>{val.total_facturado_con_iva}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ProductosFacturando;
