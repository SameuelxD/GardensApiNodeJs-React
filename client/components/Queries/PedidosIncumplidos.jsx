import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PedidosIncumplidos({ userData }) {
    const [pedidosIncumplidosList, setPedidosIncumplidosList] = useState([]);

    useEffect(() => {
        listPedidosIncumplidos();
    }, []);

    const listPedidosIncumplidos = () => {
        axios.get("http://localhost:3001/api/PedidosIncumplidos", {
            withCredentials: true
        })
            .then((response) => {
                setPedidosIncumplidosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de PedidosIncumplidos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Pedidios Incumplidos</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Pedido</th>
                        <th scope="col">Fecha Pedido</th>
                        <th scope="col">Fecha Esperada</th>
                        <th scope="col">Fecha Entrega</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Comentarios</th>
                        <th scope="col">Codigo Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidosIncumplidosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_pedido}</td>
                                <td>{val.fecha_pedido}</td>
                                <td>{val.fecha_esperada}</td>
                                <td>{val.fecha_entrega}</td>
                                <td>{val.estado}</td>
                                <td>{val.comentarios}</td>
                                <td>{val.codigo_cliente}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PedidosIncumplidos;
