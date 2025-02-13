'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, { foreignKey: 'recruiter_id', as: 'recruiter' });
      Job.belongsTo(models.Company, { foreignKey: 'company_id', as: 'company' }); 
      Job.hasMany(models.SavedJob, { foreignKey: 'job_id', as: 'savedJobs', onDelete: 'CASCADE' }); 
      Job.hasMany(models.Application, {foreignKey: 'job_id', as: 'applications', onDelete: 'CASCADE'})
    }
  }
  Job.init({
    recruiter_id: {
      type: DataTypes.UUID, 
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Company',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};