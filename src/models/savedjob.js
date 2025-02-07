'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavedJob.belongsTo(models.Job, { foreignKey: 'job_id', as: 'job' });
      SavedJob.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
  }
  SavedJob.init({
    job_id: {
      type: DataTypes.INTEGER, // Changed to INTEGER
      allowNull: false,
      references: {
        model: 'Jobs',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'SavedJob',
    tableName: 'saved_jobs',
  });
  return SavedJob;
};