import tokenService from '../services/token'

export default {
    verifyUsuario: async (req, res, next) => {
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'Sem Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        if(response.role === 'Administrador' || response.role === 'Usuario' ) {
            next();
        } else {
            return res.status(403).send({
                message: 'Nao Autorizado'
            })
        }
    },
    verifyAdministrador: async (req, res, next) => {
        // console.log('req.headers', req.headers);
        if(!req.headers.token) {
            return res.status(404).send({
                message: 'Sem Token'
            })
        }
        const response = await tokenService.decode(req.headers.token)
        console.log('response.role', response.role);
        if(response.role === 'Administrador') {
            next();
        } else {
            return res.status(403).send({
                message: 'Nao Autorizado'
            })
        }
    }

}
