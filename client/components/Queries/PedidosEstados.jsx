import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PedidosEstados({ userData }) {
    const [pedidosEstadosList, setPedidosEstadosList] = useState([]);

    useEffect(() => {
        listPedidosEstados();
    }, []);

    const listPedidosEstados = () => {
        axios.get("http://localhost:3001/api/PedidosEstados", {
            withCredentials: true
        })
            .then((response) => {
                setPedidosEstadosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de PedidosEstados ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Pedidos Estados</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Estado</th>
                        <th scope="col">Cantidad de Pedidos</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosEstadosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.estado}</td>
                                <td>{val.cantidad_pedidos}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PedidosEstados;
