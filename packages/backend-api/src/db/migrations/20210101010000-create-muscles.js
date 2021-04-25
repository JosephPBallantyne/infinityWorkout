module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('muscles', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      commonName: {
        type: new Sequelize.STRING(255),
        allowNull: true,
      },
      head: {
        type: new Sequelize.STRING(255),
        allowNull: true,
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
    }),

  down: (queryInterface) => queryInterface.dropTable('muscles'),
};
