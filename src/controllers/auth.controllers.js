import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import config from '../config.js'

const SECRETJWT = config.SECRETJWT

export const register = async (req, res) => {
    const { username, email, password } = req.body

    try {

        const mailFound = await User.findOne({ email })
        const usernameFound = await User.findOne({ username })
        if (usernameFound) return res.status(400).send(["usuario existente"])
        if (mailFound) return res.status(400).send(["Email ya se encuentra registrado"])

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken(userSaved._id)

        res.cookie('token', token)
        res.send({ status: "success", message: "usuario creado", user: newUser })

    } catch (error) {
        console.log(error)
        res.send({ status: 'error', error: 'error' })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).send(["Email no registrado"])

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).send(["contraseña incorrecta"])


        const token = await createAccessToken(userFound._id)

        res.cookie('token', token)
        res.send({ status: "success", message: "login correcto", payload: token })
        console.log(token)

    } catch (error) {
        console.log(error)
        res.send({ status: 'error', error: 'error' })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) })
    res.status(200).send({ status: "succes" })
}

export const profile = async (req, res) => {

    const user = req.user
    const userFound = await User.findById(user.id)
    await res.send({
        email: userFound.email,
        username: userFound.username
    })
}

export const verifyToken = async (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado: token no proporcionado' });
    }

    jwt.verify(token, SECRETJWT, async (err, user) => {
        if (err) res.status(401).json({ message: "no autorizado" })

        const userFound = await User.findById(user.id)

        if (!userFound) return res.status(401).send({ message: "no autorizado" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })
    })
}