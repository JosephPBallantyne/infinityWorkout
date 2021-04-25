module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('workouts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      notes: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      isPrivate: {
        type: Sequelize.BOOLEAN,
      },
      userId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'users',
          key: 'id',
        },
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

  down: (queryInterface) => queryInterface.dropTable('workouts'),
};
