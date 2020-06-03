import knex from 'knex';
import path from 'path';//padroniza caminhos de arquivo, eles mudam de acordo com o sistema operacional


//__dirname variavel global que retorna o path do arquivo onde ela se encontra. Nesse caso o retorno é o caminho para o diretorio 'database

const connection = knex({
    client: 'sqlite3',
    connection:{
        filename: path.resolve(__dirname, 'database.sqlite') //No segundo argumento, um arquivo, será criado 
    }
});

export default connection;