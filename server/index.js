const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const authController = require('./controllers/auth.controller.js');
const { checkRolsVerify, checkUsersVerify } = require('./middlewares/verifySingUp.js');
const authJwt = require('./middlewares/auth.jwt.js');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
const allowedOrigins = ['http://localhost:5173']; // Puedes agregar más orígenes si es necesario
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());


// Conexión Base de Datos MySql
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "jardineria"
})
try {
    database.connect();

} catch (error) {
    console.log("Error al conectar a con la Base de Datos: ", error);
}
console.log("Conexión a Base de Datos Exitosa");

// Auth JWT 

// Verifica si es admin para crear usuarios
//app.post('/auth/singup', [checkUsersVerify, checkRolsVerify], authJwt.verifyToken, authJwt.isAdmin, authController.singUp);

//No verifica el rol del usuario , no importa si hay token
app.post('/auth/singup', [checkUsersVerify, checkRolsVerify], authController.singUp);

app.post('/auth/singin', authController.singIn);





// Consultas Metodo Get 

// Lista de Pagos que se realizaron en el año 2008 mediante Paypal.Resultado Ordenado de mayor a menor
app.get('/api/PagosPaypal2008', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query('SELECT * FROM pago WHERE pago.forma_pago = "Paypal" AND YEAR(pago.fecha_pago) = 2008 ORDER BY pago.total DESC', (error, resultado) => {
        if (error) {
            console.log(error);
        } else {
            res.send(resultado);
        }
    });
})

// Listado de todas las formas de pago posibles , no se muestran repetidas
app.get('/api/FormasPagos', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query('SELECT DISTINCT forma_pago FROM pago', (error, resultado) => {
        if (error) {
            console.log(error);
        } else {
            res.send(resultado);
        }
    });
})

// Listado de clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante
app.get('/api/ClientesPagos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query('SELECT * FROM (SELECT DISTINCT codigo_cliente FROM cliente) AS p INNER JOIN cliente AS c ON p.codigo_cliente = c.codigo_cliente INNER JOIN empleado AS e ON c.codigo_empleado_rep_ventas = e.codigo_empleado INNER JOIN oficina AS o ON e.codigo_oficina = o.codigo_oficina ORDER BY p.codigo_cliente ASC', (error, resultado) => {
        if (error) {
            console.log(error);
        } else {
            res.send(resultado);
        }
    });
})

// Listado de empleados mostrando a su jefe y al jefe de su jefe
app.get('/api/EmpleadosJefes', [authJwt.verifyToken, authJwt.isAdmin], async (req, res) => {
    database.query(`
    SELECT 
            e1.codigo_empleado AS codigo_empleado, 
            CONCAT(e1.nombre, ' ', e1.apellido1, ' ', e1.apellido2) AS nombre_empleado, 
            e2.codigo_empleado AS codigo_jefe_empleado, 
            CONCAT(e2.nombre, ' ', e2.apellido1, ' ', e2.apellido2) AS nombre_jefe_empleado,
            e3.codigo_empleado AS codigo_jefe_superior,
            CONCAT(e3.nombre, ' ', e3.apellido1, ' ', e3.apellido2) AS nombre_jefe_superior
        FROM empleado AS e1
        INNER JOIN empleado AS e2 ON e1.codigo_jefe = e2.codigo_empleado
        INNER JOIN empleado AS e3 ON e2.codigo_jefe = e3.codigo_empleado
    `, (error, resultado) => {
        if (error) {
            console.log(error);
        } else {
            res.send(resultado);
        }
    })

})

// Listado de productos que nunca han aparecido en un pedido
app.get('/api/ProductosSinPedidos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT prod.*, gam.descripcion_texto AS descripcion_texto
                    FROM producto AS prod 
                    INNER JOIN gama_producto AS gam ON prod.gama = gam.gama
                    WHERE prod.codigo_producto NOT IN (SELECT codigo_producto FROM detalle_pedido)`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})


// Listado de cantidad de pedidos en cada estado de pedido
app.get('/api/PedidosEstados', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT estado, COUNT(*) AS cantidad_pedidos
    FROM pedido
    GROUP BY estado
    ORDER BY COUNT(*) DESC 
    `,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado de clientes que no han realizado ningun pago
app.get('/api/ClientesSinPagos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT DISTINCT c.*
                    FROM cliente AS c
                    LEFT JOIN pago AS p ON c.codigo_cliente = p.codigo_cliente
                    WHERE p.codigo_cliente IS NULL
    `,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado Clientes con sus Representantes de Ventas y la ciudad de la oficina
app.get('/api/ClientesRepresentates', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT * FROM cliente AS c
                    INNER JOIN empleado AS e 
                    ON c.codigo_empleado_rep_ventas = e.codigo_empleado
                    INNER JOIN oficina AS o 
                    ON e.codigo_oficina = o.codigo_oficina`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado de clientes con sus Representante de Ventas que no hallan hecho pagos
app.get('/api/ClientesRepresentanteSinPagos', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT DISTINCT c.codigo_cliente, c.nombre_cliente, e.codigo_empleado   AS codigo_empleado_rep_ventas,
                    e.nombre AS nombre_representante, e.apellido1 AS apellido_representante,
                    o.codigo_oficina, o.ciudad , o.telefono
                    FROM cliente AS c
                    LEFT JOIN pago AS p ON c.codigo_cliente = p.codigo_cliente
                    INNER JOIN empleado AS e ON c.codigo_empleado_rep_ventas = e.codigo_empleado
                    INNER JOIN oficina AS o ON e.codigo_oficina = o.codigo_oficina
                    WHERE p.codigo_cliente IS NULL;
`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado de pedidos que no han sido entregados a tiempo
app.get('/api/PedidosIncumplidos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT * FROM pedido AS p 
                    WHERE CAST(p.fecha_esperada AS date) < CAST(p.fecha_entrega AS date)`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado de oficinas donde no trabajan ninguno de los empleados que hayan sido representantes de ventas de algun cliente que haya realizado la compra de algun producto de la gama FRUTALES
app.get('/api/Oficinas1', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT DISTINCT o.*
                    FROM oficina AS o
                    INNER JOIN empleado AS e ON o.codigo_oficina = e.codigo_oficina
                    INNER JOIN cliente AS c ON e.codigo_empleado = c.codigo_empleado_rep_ventas
                    INNER JOIN pedido AS ped ON c.codigo_cliente = ped.codigo_cliente
                    INNER JOIN detalle_pedido AS det ON ped.codigo_pedido = det.codigo_pedido
                    INNER JOIN producto AS prod ON det.codigo_producto = prod.codigo_producto
                    INNER JOIN pago AS pag ON c.codigo_cliente = pag.codigo_cliente
                    WHERE prod.gama != 'Frutales'
     ` ,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Listado de los 20 productos mas vendidos
app.get('/api/ProductosMasVendidos', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT p.codigo_producto, p.nombre, p.gama, p.dimensiones, p.proveedor, p.descripcion, COUNT(*) AS cantidad_vendidos
    FROM detalle_pedido AS d
    INNER JOIN producto AS p ON d.codigo_producto = p.codigo_producto
    GROUP BY d.codigo_producto
    ORDER BY COUNT(*) DESC 
    LIMIT 20
    `,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Lista ventas totales de los productos que hayan facturado mas de 3000 euros
app.get('/api/ProductosFacturando', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT prod.codigo_producto, prod.nombre, prod.gama,
                    SUM(det.cantidad) AS unidades_vendidas,
                    SUM(det.cantidad * prod.precio_venta) AS total_facturado_sin_iva,
                    SUM(det.cantidad * prod.precio_venta * 1.21) AS total_facturado_con_iva FROM detalle_pedido AS det
                    INNER JOIN pedido AS ped ON det.codigo_pedido = ped.codigo_pedido
                    INNER JOIN cliente AS c ON ped.codigo_cliente = c.codigo_cliente
                    INNER JOIN pago AS pag ON c.codigo_cliente = pag.codigo_cliente
                    INNER JOIN producto AS prod ON det.codigo_producto = prod.codigo_producto
                    WHERE pag.total > 3000
                    GROUP BY prod.codigo_producto, prod.nombre
                    ORDER BY unidades_vendidas DESC

    `,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Devuelva el nombre del producto del que se han vendido mas unidades , tenga en cuenta que tendra que calcular cual es el numero total de unidades que se han vendido de cada producto a partir de los datos de la tabla detalle_pedido

app.get('/api/ProductoMasVendido', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT p.codigo_producto, p.nombre, p.gama, p.dimensiones, p.proveedor, p.descripcion, COUNT(*) AS cantidad_vendidos
    FROM detalle_pedido AS d
    INNER JOIN producto AS p 
    ON d.codigo_producto = p.codigo_producto
    GROUP BY d.codigo_producto
    ORDER BY COUNT(*) DESC 
    LIMIT 1`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Devuelve el listado de clientes con la cantidad de pedidos que han realizado
app.get('/api/ClientesPedidos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT c.codigo_cliente, c.nombre_cliente, c.telefono, 
                    c.ciudad, c.region, c.pais, c.codigo_postal, COUNT(ped.codigo_pedido) AS cantidad_pedidos 
                    FROM cliente AS c
                    LEFT JOIN pedido AS ped
                    ON c.codigo_cliente = ped.codigo_cliente
                    GROUP BY c.codigo_cliente
                    ORDER BY COUNT(ped.codigo_pedido) DESC`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Deveuelve un listado de empleados que no tienen clientes y el nombre del jefe asociado
app.get('/api/EmpleadosSinClientes', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT *, 
    CONCAT(e.nombre, ' ', e.apellido1, ' ', e.apellido2) AS nombre_empleado,
    CONCAT(j.nombre, ' ', j.apellido1, ' ', j.apellido2) AS nombre_jefe,
    e.codigo_empleado AS cod_emp,
    e.email AS emp_email,
    e.puesto AS emp_puesto,
    e.codigo_oficina AS cod_ofi,  
    j.codigo_empleado AS cod_jef
    FROM empleado AS e
    INNER JOIN empleado AS j ON e.codigo_jefe = j.codigo_empleado  -- Corrección: se cambió "j.cod_jef" a "j.codigo_empleado"
    WHERE e.codigo_empleado NOT IN (SELECT codigo_empleado_rep_ventas FROM cliente)
`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Lista de Oficinas de aquellos empleados que son  representantes de ventas pero no tienen clientes
app.get('/api/Oficinas2', [authJwt.verifyToken, authJwt.isUser], async (req, res) => {
    database.query(`SELECT *,
                    CONCAT(e.nombre, ' ',e.apellido1,' ',e.apellido2 ) AS emp_nombre,
                    CONCAT(o.linea_direccion1, ' ',o.linea_direccion2) AS dir_oficina
                    FROM empleado AS e
                    INNER JOIN oficina AS o
                    ON e.codigo_oficina = o.codigo_oficina
                    WHERE e.puesto = 'Representante Ventas' AND e.codigo_empleado NOT IN (SELECT codigo_empleado_rep_ventas FROM cliente)`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Lista de clientes que no se les han entregado a tiempo un pedido
app.get('/api/ClientesPedidosIncumplidos', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT c.codigo_cliente, c.nombre_cliente, c.telefono, 
                    c.ciudad, c.region, c.pais, c.codigo_postal, COUNT(*) AS pedidos_incumplidos FROM pedido AS ped
                    INNER JOIN cliente AS c
                    ON ped.codigo_cliente = c.codigo_cliente
                    WHERE CAST(ped.fecha_esperada AS date) < CAST(ped.fecha_entrega AS date)
                    GROUP BY ped.codigo_cliente
                    ORDER BY COUNT(*) DESC `,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})

// Lista de gamas de productos que han comprado cada cliente
app.get('/api/ClientesProductosGamas', [authJwt.verifyToken, authJwt.isModerator], async (req, res) => {
    database.query(`SELECT c.codigo_cliente, c.nombre_cliente, c.telefono, 
                    c.ciudad, c.region, c.pais, c.codigo_postal,
                    GROUP_CONCAT(DISTINCT gam.gama SEPARATOR ', ') AS gamas_compradas
                    FROM detalle_pedido AS det
                    INNER JOIN producto AS prod ON det.codigo_producto = prod.codigo_producto 
                    INNER JOIN gama_producto AS gam ON prod.gama = gam.gama
                    INNER JOIN pedido AS ped ON det.codigo_pedido = ped.codigo_pedido
                    INNER JOIN cliente AS c ON ped.codigo_cliente = c.codigo_cliente
                    GROUP BY c.codigo_cliente`,
        (error, resultado) => {
            if (error) {
                console.log(error);
            } else {
                res.send(resultado);
            }
        })
})



// Conexion con el puerto para el servicio
app.listen(3001, () => {
    console.log(`Servidor Escuchando en el Puerto:
http://localhost:3001` );
})