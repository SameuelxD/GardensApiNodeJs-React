import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function PagosPaypal2008({ userData }) {
  const [pagosPaypal2008List, setPagosPaypal2008List] = useState([]);

  useEffect(() => {
    listPagosPaypal2008();
  }, []);

  const listPagosPaypal2008 = () => {
    axios.get("http://localhost:3001/api/PagosPaypal2008", {
      withCredentials: true
    })
      .then((response) => {
        setPagosPaypal2008List(response.data);
      })
      .catch(error => {
        console.log("Error al mostrar la lista de PagosPaypal2008 ", error);
      });
  }

  return (
    <div className="container">
      <h2 className='item_title'>Pagos Paypal 2008</h2>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Código Cliente</th>
            <th scope="col">Forma Pago</th>
            <th scope="col"># ID Transacción</th>
            <th scope="col">Fecha Pago</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {pagosPaypal2008List.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.codigo_cliente}</td>
                <td>{val.forma_pago}</td>
                <td>{val.id_transaccion}</td>
                <td>{val.fecha_pago}</td>
                <td>{val.total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PagosPaypal2008;
