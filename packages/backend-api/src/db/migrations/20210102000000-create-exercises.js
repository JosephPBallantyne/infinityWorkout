module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('exercises', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      trainingTypeId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'trainingTypes',
          key: 'id',
        },
      },
      equipmentId: {
        type: new Sequelize.INTEGER(),
        references: {
          model: 'equipment',
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

  down: (queryInterface) => queryInterface.dropTable('exercises'),
};
