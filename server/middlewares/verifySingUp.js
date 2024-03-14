const mysql = require('mysql2');

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "jardineria"
});


const checkRolsVerify = async (req, res, next) => {
    try {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                const [rows] = await database.promise().query('SELECT * FROM Rol WHERE name = ?', [req.body.roles[i]]);
                if (rows.length === 0) {
                    return res.status(400).json({
                        message: `Role '${req.body.roles[i]}' doesn't exist`
                    });
                }
            }
        }
        next();
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const checkUsersVerify = async (req, res, next) => {
    try {
        const [usernameRows] = await database.promise().query('SELECT * FROM User WHERE username = ?', [req.body.username]);
        const [emailRows] = await database.promise().query('SELECT * FROM User WHERE email = ?', [req.body.email]);

        if (usernameRows.length > 0 || emailRows.length > 0) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        next();
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { checkRolsVerify, checkUsersVerify }