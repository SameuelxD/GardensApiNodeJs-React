import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ClientesRepresentanteSinPagos({ userData }) {
    const [clientesRepresentanteSinPagosList, setClientesRepresentanteSinPagosList] = useState([]);

    useEffect(() => {
        listClientesRepresentanteSinPagos();
    }, []);

    const listClientesRepresentanteSinPagos = () => {
        axios.get("http://localhost:3001/api/ClientesRepresentanteSinPagos", {
            withCredentials: true
        })
            .then((response) => {
                setClientesRepresentanteSinPagosList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ClientesRepresentanteSinPagos ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Clientes sin pagos con sus Representantes de Ventas</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Cliente</th>
                        <th scope="col">Nombre Cliente</th>
                        <th scope="col">Codigo Representante-Ventas</th>
                        <th scope="col">Nombre y Apellidos Representante-Ventas</th>
                        <th scope="col">Codigo Oficina</th>
                        <th scope="col">Ciudad Oficina</th>
                        <th scope="col">Telefono Oficina</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesRepresentanteSinPagosList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_cliente}</td>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.codigo_empleado_rep_ventas}</td>
                                <td>{val.nombre_representante} {val.apellido_representante}</td>
                                <td>{val.codigo_oficina}</td>
                                <td>{val.ciudad}</td>
                                <td>{val.telefono}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ClientesRepresentanteSinPagos;
