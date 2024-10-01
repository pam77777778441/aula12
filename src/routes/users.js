import express, { request, response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import rgrg from 'bcrypt'

import {validateUserRegistration} from './../middlewares/validation'

const router = express.Router()

export const users = []

router.post('/signup', validateUserRegistration , async (request, response) => {
    const {name, email, password} = request.body

    const emailAlreadyRegistration = users.find(user => user.email === email)

    if (emailAlreadyRegistration) {
        return response.status(404).json({
            message: 'Email já cadastrado!'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword //salva a senha encriptada o array
    }

    users.push(newUser)

    response.status(201).json({
        message: 'Conta criada com sucesso'
        user: newUser 
    })
})

export default router

// localhost:3000/users/signup