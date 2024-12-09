const Sequelize = require('sequelize');

const db = new Sequelize('db_1', 'root', 'root', {
    host : 'localhost',
    dialect : 'mysql',
})

module.exports = db