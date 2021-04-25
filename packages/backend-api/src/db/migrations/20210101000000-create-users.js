module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: new Sequelize.STRING(255),
        unique: true,
        allowNull: true,
      },
      email: {
        type: new Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      passwordResetToken: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      passwordResetTokenExpiredAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('users'),
};
