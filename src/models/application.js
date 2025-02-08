"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.User, { foreignKey: "candidate_id" });
      Application.belongsTo(models.Job, { foreignKey: "job_id", as: 'job' });
    }
  }
  Application.init(
    {
      application_id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      candidate_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User", // Model name (case-sensitive)
          key: "id",
        },
      },
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Job", // Model name (case-sensitive)
          key: "id",
        },
      },
      candidate_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("applied", "interviewing", "hired", "rejected"),
        allowNull: false,
        defaultValue: "applied",
      },
      resume: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      skills: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Application",
    }
  );
  return Application;
};
