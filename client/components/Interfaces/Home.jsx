import React, { useState } from 'react';

import PagosPaypal2008 from '../Queries/PagosPaypal2008';
import FormasPagos from '../Queries/FormasPagos';
import ClientesPagos from '../Queries/ClientesPagos';
import EmpleadosJefes from '../Queries/EmpleadosJefes';
import ProductosSinPedidos from '../Queries/ProductosSinPedidos';
import PedidosEstados from '../Queries/PedidosEstados';
import ClientesSinPagos from '../Queries/ClientesSinPagos';
import ClientesRepresentantes from '../Queries/ClientesRepresentates';
import ClientesRepresentanteSinPagos from '../Queries/ClientesRepresentanteSinPagos'
import PedidosIncumplidos from '../Queries/PedidosIncumplidos';
import Oficinas1 from '../Queries/Oficinas1';
import ProductosMasVendidos from '../Queries/ProductosMasVendidos';
import ProductosFacturando from '../Queries/ProductosFacturando';
import ProductoMasVendido from '../Queries/ProductoMasVendido';
import ClientesPedidos from '../Queries/ClientesPedidos';
import EmpleadosSinClientes from '../Queries/EmpleadosSinClientes';
import Oficinas2 from '../Queries/Oficinas2';
import ClientesPedidosIncumplidos from '../Queries/ClientesPedidosIncumplidos';
import ClientesProductosGamas from '../Queries/ClientesProductosGamas';

function Home({ userData }) {

    const [selectedQuery, setSelectedQuery] = useState('');

    const handleQuerySelection = (event) => {
        setSelectedQuery(event.target.value);
    };
    return (
        <main className='main-container'>
            <div className='main-item'>
                <h1 className="dashboard-title">Dashboard de Consultas</h1>
            </div>
            <div className="query-selector">
                <label htmlFor="querySelect" className='querySelect'>Seleccione una consulta:</label>
                <select id="querySelect" value={selectedQuery} onChange={handleQuerySelection}>
                    <option value="">Seleccionar...</option>
                    <option value="pagosPaypal2008">PagosPaypal2008</option>
                    <option value="formasPagos">FormasPagos</option>
                    <option value="clientesPagos">ClientesPagos</option>
                    <option value="empleadosJefes">EmpleadosJefes</option>
                    <option value="productosSinPedidos">ProductosSinPedidos</option>
                    <option value="pedidosEstados">PedidosEstados</option>
                    <option value="clientesSinPagos">ClientesSinPagos</option>
                    <option value="clientesRepresentantes">ClientesRepresentantes</option>
                    <option value="clientesRepresentantesSinPagos">ClientesRepresentantesSinPagos</option>
                    <option value="pedidosIncumplidos">PedidosIncumplidos</option>
                    <option value="oficinas1">Oficinas1</option>
                    <option value="productosMasVendidos">ProductosMasVendidos</option>
                    <option value="productosFacturando">ProductosFacturando</option>
                    <option value="productoMasVendido">ProductoMasVendido</option>
                    <option value="clientesPedidos">ClientesPedidos</option>
                    <option value="empleadosSinClientes">EmpleadosSinClientes</option>
                    <option value="oficinas2">Oficinas2</option>
                    <option value="clientesPedidosIncumplidos">ClientesPedidosIncumplidos</option>
                    <option value="clientesProductosGamas">ClientesProductosGamas</option>
                </select>

                {selectedQuery === 'pagosPaypal2008' && <PagosPaypal2008 userData={userData} />}
                {selectedQuery === 'formasPagos' && <FormasPagos userData={userData} />}
                {selectedQuery === 'clientesPagos' && <ClientesPagos userData={userData} />}
                {selectedQuery === 'empleadosJefes' && <EmpleadosJefes userData={userData} />}
                {selectedQuery === 'productosSinPedidos' && <ProductosSinPedidos userData={userData} />}
                {selectedQuery === 'pedidosEstados' && <PedidosEstados userData={userData} />}
                {selectedQuery === 'clientesSinPagos' && <ClientesSinPagos userData={userData} />}
                {selectedQuery === 'clientesRepresentantes' && <ClientesRepresentantes userData={userData} />}
                {selectedQuery === 'clientesRepresentantesSinPagos' && <ClientesRepresentanteSinPagos userData={userData} />}
                {selectedQuery === 'pedidosIncumplidos' && <PedidosIncumplidos userData={userData} />}
                {selectedQuery === 'oficinas1' && <Oficinas1 userData={userData} />}
                {selectedQuery === 'productosMasVendidos' && <ProductosMasVendidos userData={userData} />}
                {selectedQuery === 'productosFacturando' && <ProductosFacturando userData={userData} />}
                {selectedQuery === 'productoMasVendido' && <ProductoMasVendido userData={userData} />}
                {selectedQuery === 'clientesPedidos' && <ClientesPedidos userData={userData} />}
                {selectedQuery === 'empleadosSinClientes' && <EmpleadosSinClientes userData={userData} />}
                {selectedQuery === 'oficinas2' && <Oficinas2 userData={userData} />}
                {selectedQuery === 'clientesPedidosIncumplidos' && <ClientesPedidosIncumplidos userData={userData} />}
                {selectedQuery === 'clientesProductosGamas' && <ClientesProductosGamas userData={userData} />}

            </div>
        </main>
    )
}

export default Home