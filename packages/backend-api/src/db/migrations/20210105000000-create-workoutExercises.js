module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('workoutExercises', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      workoutId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'workouts',
          key: 'id',
        },
      },
      exerciseId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'exercises',
          key: 'id',
        },
      },
      sets: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      reps: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      weight: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      duration: {
        type: new Sequelize.STRING(255),
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

  down: (queryInterface) => queryInterface.dropTable('workoutExercises'),
};
