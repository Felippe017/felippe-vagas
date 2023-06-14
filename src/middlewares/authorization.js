const { verify, sign } = require("jsonwebtoken");


const createToken = (_req, res, _next) => {
    try {
        const secret = process.env.JWT_SECRET;

        const jwtConfig = {
            expiresIn: '1d',
            algorithm: 'HS256',
        };

        const token = sign({}, secret, jwtConfig);
    
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const validateJWT = async (req, res, next) => {
    const token = req.headers.authorization;

    /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
    if (!token) {
        return res.status(401).json({ error: 'Token não encontrado' });
    }
  
    try {
        const tokenWithoutBearer = token.replace(/^Bearer\s+/, '');

        /* Através o método verify, podemos validar e decodificar o nosso JWT. */
        verify(tokenWithoutBearer, process.env.JWT_SECRET, async (error) => {
            return error ? res.status(401).send({ message: error.message }) : next();
        });
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = {
    createToken,
    validateJWT
}