const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  
  sequelize.define('episode', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  })
}