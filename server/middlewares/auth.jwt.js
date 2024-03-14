const jwt = require('jsonwebtoken');
const config = require('../config.js');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'jardineria',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies['x-access-token'];
        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, config.SECRET);
        if (!decoded || !decoded.id || !decoded.rol_name) { // Cambiado a 'rol_name' en lugar de 'rol_id'
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.userId = decoded.id;
        req.userRole = decoded.rol_name; // Cambiado a 'rol_name' en lugar de 'rol_id'
        next();
    } catch (error) {
        console.error("Error:", error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const hasRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            if (!req.userRole) {
                return res.status(401).json({ message: 'Unauthorized: User role not defined' });
            }

            const roleHierarchy = {
                'user': 0,
                'moderator': 1,
                'admin': 2
            };

            const requiredRoleLevel = roleHierarchy[requiredRole];
            const userRoleLevel = roleHierarchy[req.userRole];

            if (userRoleLevel >= requiredRoleLevel || req.userRole === 'admin') {
                next();
            } else {
                return res.status(403).json({ message: `Require ${requiredRole} Role` });
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};

const isUser = hasRole('user');
const isModerator = hasRole('moderator');
const isAdmin = hasRole('admin');


module.exports = { verifyToken, hasRole, isUser, isModerator, isAdmin };
