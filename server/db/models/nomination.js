const Sequelize = require('sequelize')
const db = require('../db')

const Nomination = db.define('nomination', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Nomination
