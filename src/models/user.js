'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid'); 

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Job, { foreignKey: 'recruiter_id', as: 'jobs' });
      User.hasMany(models.SavedJob, { foreignKey: 'user_id', as: 'savedJobs' });
      User.hasMany(models.Application, {foreignKey: 'candidate_id'})
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: { // Added email
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: { // Added password
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: { // Role is now optional
      type: DataTypes.STRING,
      allowNull: true, // Changed to true
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};