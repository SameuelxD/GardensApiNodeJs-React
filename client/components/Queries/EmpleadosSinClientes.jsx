import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function EmpleadosSinClientes({ userData }) {
    const [empleadosSinClientesList, setEmpleadosSinClientesList] = useState([]);

    useEffect(() => {
        listEmpleadosSinClientes();
    }, []);

    const listEmpleadosSinClientes = () => {
        axios.get("http://localhost:3001/api/EmpleadosSinClientes", {
            withCredentials: true
        })
            .then((response) => {
                setEmpleadosSinClientesList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de EmpleadosSinClientes ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Empleados sin Clientes</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Empleado</th>
                        <th scope="col">Nombres y Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Puesto</th>
                        <th scope="col">Codigo Oficina</th>
                        <th scope="col">Codigo Jefe</th>
                        <th scope="col">Nombres y Apellidos Jefe</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosSinClientesList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.cod_emp}</td>
                                <td>{val.nombre_empleado}</td>
                                <td>{val.emp_email}</td>
                                <td>{val.emp_puesto}</td>
                                <td>{val.cod_ofi}</td>
                                <td>{val.cod_jef}</td>
                                <td>{val.nombre_jefe}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default EmpleadosSinClientes;
