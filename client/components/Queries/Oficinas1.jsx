import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function Oficinas1({ userData }) {
    const [oficinas1List, setOficinas1List] = useState([]);

    useEffect(() => {
        listOficinas1();
    }, []);

    const listOficinas1 = () => {
        axios.get("http://localhost:3001/api/Oficinas1", {
            withCredentials: true
        })
            .then((response) => {
                setOficinas1List(response.data);
            })
            .catch(error => {
                console.log("Error al mostrar la lista de Oficinas1 ", error);
            });
    }

    return (
        <div className="container">
            <h2 className='item_title'>Informacion Oficinas 1</h2>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Código Oficina</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Pais</th>
                        <th scope="col">Region</th>
                        <th scope="col">Codigo Postal</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                    </tr>
                </thead>
                <tbody>
                    {oficinas1List.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.codigo_oficina}</td>
                                <td>{val.ciudad}</td>
                                <td>{val.pais}</td>
                                <td>{val.region}</td>
                                <td>{val.codigo_postal}</td>
                                <td>{val.telefono}</td>
                                <td>{val.linea_direccion1} {val.linea_direccion2}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Oficinas1;
