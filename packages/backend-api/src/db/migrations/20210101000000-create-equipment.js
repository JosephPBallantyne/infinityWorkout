module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('equipment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(255),
        allowNull: false,
      },
      abbreviation: { type: new Sequelize.STRING(255), allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable('equipment'),
};
