const Sequelize = require('sequelize');

const db = new Sequelize('sql12751772', 'sql12751772', 'I1qZyAlyAF', {
    host : 'sql12.freemysqlhosting.net',
    dialect : 'mysql',
})

module.exports = db