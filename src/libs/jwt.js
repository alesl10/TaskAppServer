import jwt from 'jsonwebtoken'
import config from '../config.js';

const SECRETJWT = config.SECRETJWT

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { id: payload },
            SECRETJWT,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
    })
}
