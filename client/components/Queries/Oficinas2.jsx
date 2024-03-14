import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Oficinas2({ userData }) {
    const [oficinas2List, setOficinas2List] = useState([]);

    useEffect(() => {
        listOficinas2();
    }, []);

    const listOficinas2 = () => {
        axios.get("http://localhost:3001/api/Oficinas2", {
            withCredentials: true
        })
            .then((response) => {
                setOficinas2List(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de Oficinas2 ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Empleados Representantes de Ventas sin Clientes</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Empleado</th>
                        <th scope="col">Nombres y Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Puesto</th>
                        <th scope="col">Codigo Jefe</th>
                        <th scope="col">Codigo Oficina</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Region</th>
                        <th scope="col">Codigo Postal</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                    </tr>
                </thead>
                <tbody>
                    {oficinas2List.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_empleado}</td>
                                <td>{val.emp_nombre}</td>
                                <td>{val.email}</td>
                                <td>{val.puesto}</td>
                                <td>{val.codigo_jefe}</td>
                                <td>{val.codigo_oficina}</td>
                                <td>{val.ciudad}</td>
                                <td>{val.pais}</td>
                                <td>{val.region}</td>
                                <td>{val.codigo_postal}</td>
                                <td>{val.telefono}</td>
                                <td>{val.dir_oficina}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Oficinas2;
