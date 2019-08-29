import Sequelize from 'sequelize';
import { sequelize } from "../database/database";

const Usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    role: {
        type: Sequelize.STRING
    },
    nome: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    created_by: {
        type: Sequelize.INTEGER
    },
    updated_by: {
        type: Sequelize.INTEGER
    }
},{
    underscored: true,
    tableName: 'usuario',
})

Usuario.hasMany(Usuario, { foreignKey: 'created_by', sourceKey: 'id'})
Usuario.hasMany(Usuario, { foreignKey: 'updated_by', sourceKey: 'id'})
Usuario.belongsTo(Usuario, { foreignKey: 'created_by', sourceKey: 'id'})
Usuario.belongsTo(Usuario, { foreignKey: 'updated_by', sourceKey: 'id'})

export default Usuario