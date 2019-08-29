import Usuario from "../models/Usuario";
import bcrypt from 'bcryptjs';
import token from '../services/token'

export default {
    create: async (req, res, next) => {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const {
            role,
            nome,
            email,
            password,
            created_by,
            updated_by
        } = req.body;

        try {
            let newUsuario = await Usuario.create({
               role,
               nome,
               email,
               password,
               created_by,
               updated_by
            }, {
                fields: ['role','nome','email','password','created_by', 'updated_by']
            });

            console.log('newUsuario', newUsuario);

            if(newUsuario) {
                return res.json({
                    message: 'Usuario criado com sucesso :)',
                    data: newUsuario
                })
            }
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Houve um Erro :(',
                data: {}
            });
            next(e);
        }
    },
    findById: async (req, res, next) => {
        console.log('req.params', req.params);
        const { id } = req.params;
        try {
            const usuario = await Usuario.findOne({
                where: { id }
            });
            console.log('usuario: ', usuario);
            res.json(usuario);
        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Houve um Erro'
            });
            next(e);
        }
    },
    findAll: async (req, res, next) => {
        try {
            const usuarios = await Usuario.findAll();
            res.json(usuarios);
        } catch (e) {
            res.status(500).send({
                message: 'Houve um Erro'
            });
            next(e);
        }
    },
    update: async (req, res, next) => {
        const { id } = req.params;
        const {
            role,
            nome,
            email,
            password,
            created_by,
            updated_by
        } = req.body;
        try {
            const usuario = await Usuario.findOne({
                where: { id }
            });

            let userOld = usuario;

            if(usuario) {
                usuario.update({
                    role: role ? role : userOld.role,
                    nome: nome ? nome : userOld.nome,
                    email: email ? email : userOld.email,
                    password: password ? password : userOld.password,
                    created_by: created_by ? created_by : userOld.created_by,
                    updated_by: updated_by ? updated_by : userOld.updated_by
                });

                return res.json({
                    message: 'Usuário atualizado com sucesso',
                    data: usuario
                });
            }

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Houve um Erro'
            });
            next(e);
        }
    },
    remove: async (req, res, next) => {
        const { id } = req.params;
        try {
            const deleteRowCount = await Usuario.destroy({
               where: { id }
            });
            res.json({
                message: 'Usuario removido com sucesso',
                count: deleteRowCount
            });

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Houve um Erro'
            });
            next(e);
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const usuario = await Usuario.findOne({
                where: { email }
            });

            if(usuario) {
                let match = await bcrypt.compare(password, usuario.password);
                if(match) {
                    let tokenReturn = await token.encode(usuario.id);
                    res.status(200).json({ usuario, tokenReturn })
                } else {
                    res.status(404).send({
                        message: 'Senha Incorreta'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'Usuário Inexistente'
                });
            }

        } catch (e) {
            console.error(e);
            res.status(500).send({
                message: 'Houve um erro'
            });
            next(e);
        }
    }
};