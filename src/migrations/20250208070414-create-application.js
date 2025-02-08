'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Applications', {
      application_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      candidate_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",  // reference table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      job_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "jobs", // reference table name
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      candidate_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM("applied", "interviewing", "hired", "rejected"),
        allowNull: false,
        defaultValue: "applied",
      },
      resume: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      skills: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      experience: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      education: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Applications');
  }
};