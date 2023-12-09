const Sequelize = require('sequelize');

const sequelize = new Sequelize('project-4', 'root', 'Nish@nt9', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;