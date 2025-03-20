const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401);

    try{
        const verified = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = verified.id;

        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token "});
    }
}

module.exports = authenticateToken;