import jwt from 'jsonwebtoken'
import config from '../config.js';


const SECRETJWT = config.SECRETJWT

export const authRequired = (req, res, next) => {
  
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado: token no proporcionado' });
    }

    jwt.verify(token, SECRETJWT, (err, user) => {
        // console.log(user)
        if (err) return res.status(403).send({ message: "token invalido" })
        req.user = user
        next()
    })
}