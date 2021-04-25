module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('scheduleWorkouts', {
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
      scheduleId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'schedules',
          key: 'id',
        },
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      time: {
        type: Sequelize.ENUM,
        values: ['morning', 'afternoon', 'evening'],
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

  down: (queryInterface) => queryInterface.dropTable('scheduleWorkouts'),
};
