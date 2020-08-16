// comando para instalar a dependencia do sqlite
// npm install sqlite-async

const Database = require('sqlite-async')

// comando para executar para criar o banco e tabelas
// node src/database/db.js
function execute(db){
    // criar as tabelas do banco de dados
    return db.exec(`
            CREATE TABLE IF NOT EXISTS proffys (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, 
                avatar TEXT, 
                whatsapp TEXT, 
                bio TEXT
            );

            CREATE TABLE IF NOT EXISTS classes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                subject INTEGER, 
                cost TEXT, 
                proffy_id INTEGER
            );

            CREATE TABLE IF NOT EXISTS class_schedule (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                class_id INTEGER,
                weekday INTEGER, 
                time_from INTERGER, 
                time_to INTEGER
            );

        `)
}

// o "then" é adicionado porque a forma que o JS é lido não dá tempo de abrir e
// realizar as consultas no banco, dessa forma, colocamos o THEN para fazer
// outra ação de modo que ele consiga abrir o banco e partir para as proximas linhas
// com o banco já aberto.

// "module.exports" para possibilitar utilizar o require em outros lugares do código
// a opcao tb permite receber vários tipos de dados
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)
