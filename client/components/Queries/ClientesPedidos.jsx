import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ClientesPedidos({ userData }) {
    const [clientesPedidosList, setClientesPedidosList] = useState([]);

    useEffect(() => {
        listClientesPedidos();
    }, []);

    const listClientesPedidos = () => {
        axios.get("http://localhost:3001/api/ClientesPedidos", {
            withCredentials: true
        })
            .then((response) => {
                setClientesPedidosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ClientesPedidos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Clientes Cantidad de Pedidos</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Codigo Cliente</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Region</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Codigo Postal</th>
                        <th scope="col">Cantidad Pedidos</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesPedidosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_cliente}</td>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.telefono}</td>
                                <td>{val.ciudad}</td>
                                <td>{val.region}</td>
                                <td>{val.pais}</td>
                                <td>{val.codigo_postal}</td>
                                <td>{val.cantidad_pedidos}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ClientesPedidos;
