import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function ClientesRepresentantes({ userData }) {
    const [clientesRepresentantesList, setClientesRepresentantesList] = useState([]);

    useEffect(() => {
        listClientesRepresentantes();
    }, []);

    const listClientesRepresentantes = () => {
        axios.get("http://localhost:3001/api/ClientesRepresentates", {
            withCredentials: true
        })
            .then((response) => {
                setClientesRepresentantesList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de ClientesRepresentantes ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Clientes con sus Representantes de Ventas</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Cliente</th>
                        <th scope="col">Nombre Cliente</th>
                        <th scope="col">Codigo Representante-Ventas</th>
                        <th scope="col">Nombre y Apellidos Representante-Ventas</th>
                        <th scope="col">Codigo Oficina</th>
                        <th scope="col">Ciudad Oficina</th>
                    </tr>
                </thead>
                <tbody>
                    {clientesRepresentantesList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_cliente}</td>
                                <td>{val.nombre_cliente}</td>
                                <td>{val.codigo_empleado}</td>
                                <td>{val.nombre} {val.apellido1} {val.apellido2}</td>
                                <td>{val.codigo_oficina}</td>
                                <td>{val.ciudad}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ClientesRepresentantes;
