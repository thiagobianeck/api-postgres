import jwt from 'jsonwebtoken'
import models from '../models'

async function checkToken(token) {
    let _id = null
    try {
        const { id } = await jwt.decode(token)
        _id = id
    } catch (e) {
        return false
    }

    const user = await  models.Usuario.findOne({
        where: { id }
    })

    if(user) {
        const token = jwt.sign({id: _id}, 'chavesecretab17z50f7w4r352019', {expiresIn: '1d'})
        return {token, role: user.role}
    } else {
        return false
    }
}

export default {
    encode: async (id) => {
        const token = jwt.sign({ id },'chavesecretab17z50f7w4r352019',{ expiresIn: '1d' })
        return token
    },
    decode: async (token) => {
        try {
            const { id } = await jwt.verify(token, 'chavesecretab17z50f7w4r352019')
            const user = await models.Usuario.findOne({
                where: { id }
            });
            if (user) {
                return user
            } else {
                return false
            }
        } catch (e) {
            const newToken = await checkToken(token)
            return newToken
        }
    }
}
