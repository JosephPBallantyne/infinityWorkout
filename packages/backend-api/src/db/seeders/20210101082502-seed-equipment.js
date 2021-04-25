const equipment = require('./data/equipment.json');

module.exports = {
  up: (queryInterface) => {
    const now = new Date();
    const timestamps = {
      createdAt: now,
      updatedAt: now,
    };
    return queryInterface.bulkInsert(
      'equipment',
      equipment.map((identity) => ({ ...identity, ...timestamps })),
      {}
    );
  },

  down: (queryInterface) => queryInterface.bulkDelete('equipment', null, {}),
};
