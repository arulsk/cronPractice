const Sequelize = require('sequelize')

const sequelize = new Sequelize('company','root','Arulk1535@29',{
    host : 'localhost',
    dialect : 'mysql'
})

module.exports = sequelize