import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function FormasPagos({ userData }) {
  const [formasPagosList, setFormasPagosList] = useState([]);

  useEffect(() => {
    listFormasPagos();
  }, []);

  const listFormasPagos = () => {
    axios.get("http://localhost:3001/api/FormasPagos", {
      withCredentials: true
    })
      .then((response) => {
        setFormasPagosList(response.data);
      })
      .catch(error => {
        console.log("Error al mostrar la lista de FormasPagos ", error);
      });
  }

  return (
    <div className="container">
      <h2 className='item_title'>Formas de Pagos</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Forma Pago</th>
          </tr>
        </thead>
        <tbody>
          {formasPagosList.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.forma_pago}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FormasPagos;
