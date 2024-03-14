import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function EmpleadosJefes({ userData }) {
    const [empleadosJefesList, setEmpleadosJefesList] = useState([]);

    useEffect(() => {
        listEmpleadosJefes();
    }, []);

    const listEmpleadosJefes = () => {
        axios.get("http://localhost:3001/api/EmpleadosJefes", {
            withCredentials: true
        })
            .then((response) => {
                setEmpleadosJefesList(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de EmpleadosJefes ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Empleados con sus Jefes y su Jefes</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Empleado</th>
                        <th scope="col">Nombres y Apellidos</th>
                        <th scope="col">Codigo Jefe</th>
                        <th scope="col">Nombres y Apellidos Jefe</th>
                        <th scope="col">Codigo Jefe-Superior</th>
                        <th scope="col">Nombres y Apellidos Jefe-Superior</th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosJefesList.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_empleado}</td>
                                <td>{val.nombre_empleado}</td>
                                <td>{val.codigo_jefe_empleado}</td>
                                <td>{val.nombre_jefe_empleado}</td>
                                <td>{val.codigo_jefe_superior}</td>
                                <td>{val.nombre_jefe_superior}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default EmpleadosJefes;
