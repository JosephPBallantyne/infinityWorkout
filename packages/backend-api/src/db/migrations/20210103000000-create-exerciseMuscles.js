module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('exerciseMuscles', {
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
      muscleId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'muscles',
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

  down: (queryInterface) => queryInterface.dropTable('exerciseMuscles'),
};
