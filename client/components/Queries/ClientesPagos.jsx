import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ClientesPagos({ userData }) {
    const [clientesPagosList, setClientesPagosList] = useState([]);

    useEffect(() => {
        listClientesPagos();
    }, []);

    const listClientesPagos = () => {
        axios.get("http://localhost:3001/api/ClientesPagos", {
            withCredentials: true // Permite enviar cookies en la solicitud
        })
            .then((response) => {
                setClientesPagosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ClientesPagos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Clientes con Pagos</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Cliente</th>
                        <th scope="col">Nombre Cliente</th>
                        <th scope="col">Codigo Representante-Ventas</th>
                        <th scope="col">Nombre Representante-Ventas</th>
                        <th scope="col">Ciudad Oficina Representante-Ventas</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesPagosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_cliente}</td>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.codigo_empleado_rep_ventas}</td>
                                <td>{val.nombre}</td>
                                <td>{val.ciudad}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ClientesPagos;
