module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('favouritedExercises', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exerciseId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      userId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'users',
          key: 'id',
        },
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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

  down: (queryInterface) => queryInterface.dropTable('favouritedExercises'),
};
