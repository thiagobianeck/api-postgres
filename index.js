import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import router from './routes';
import {sequelize} from './database/database';
import Sequelize from 'sequelize';

Sequelize.Promise = global.Promise;
const app = express();
app.use(morgan('dev'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router);
app.set('port', process.env.PORT || 3000)

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexao com o BD estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Impossivel conectar ao Banco de Dados:', err);
    });

app.listen(app.get('port'), () => {
    console.log(`Aplicação rodando na porta ${app.get('port')}`);
})