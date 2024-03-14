const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'jardineria',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const singUp = async (req, res) => {
    try {
        const { username, email, password, rol_id } = req.body;

        const connection = await pool.getConnection();

        // Verificar si el usuario ya existe
        const [existingUserRows] = await connection.execute('SELECT * FROM User WHERE email = ?', [email]);
        if (existingUserRows.length > 0) {
            connection.release();
            return res.status(400).json({ message: 'User already exists' });
        }

        // Insertar el nuevo usuario
        const [insertUserResult] = await connection.execute('INSERT INTO User (username, email, password, rol_id) VALUES (?, ?, ?, ?)', [username, email, password, rol_id]);

        // Obtener información del rol asociado al usuario
        const [userRows] = await connection.execute(`
            SELECT u.id, u.email, u.rol_id, r.names as rol_name 
            FROM User u
            JOIN Rol r ON u.rol_id = r.id
            WHERE u.id = ?`, [insertUserResult.insertId]);

        connection.release();

        const user = userRows[0];
        const userId = user.id;
        const addressEmail = user.email;
        const rolId = user.rol_id;
        const rolName = user.rol_name;

        // Generar token de autenticación
        const tokenPayload = {
            id: userId,
            addressEmail: addressEmail,
            rol_id: rolId,
            rol_name: rolName // Agregar el nombre del rol al payload
            // Otra información adicional que quieras incluir en el token
        };

        const token = jwt.sign(tokenPayload, config.SECRET, { expiresIn: 86400 });

        res.json({ token });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


const singIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const connection = await pool.getConnection();

        const [userRows] = await connection.execute(`
            SELECT u.id, u.email, u.rol_id, r.names as rol_name 
            FROM User u
            JOIN Rol r ON u.rol_id = r.id
            WHERE u.email = ? AND u.password = ?`, [email, password]);

        if (userRows.length === 0) {
            connection.release();
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = userRows[0];
        const userId = user.id;
        const addressEmail = user.email;
        const rolId = user.rol_id;
        const rolName = user.rol_name;

        connection.release();

        const tokenPayload = {
            id: userId,
            addressEmail: addressEmail,
            rol_id: rolId,
            rol_name: rolName // Agregar el nombre del rol al payload
            // Otra información adicional que quieras incluir en el token
        };

        const token = jwt.sign(tokenPayload, config.SECRET, { expiresIn: 86400 });

        res.cookie('x-access-token', token, { httpOnly: true });

        res.json({ token, user });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}






module.exports = { singUp, singIn };