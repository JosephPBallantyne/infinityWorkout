module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('exerciseMuscleGroups', {
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
      muscleGroupId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'muscleGroups',
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

  down: (queryInterface) => queryInterface.dropTable('exerciseMuscleGroups'),
};
