const muscleGroups = require('./data/muscleGroups.json');

module.exports = {
  up: (queryInterface) => {
    const now = new Date();
    const timestamps = {
      createdAt: now,
      updatedAt: now,
    };
    return queryInterface.bulkInsert(
      'muscleGroups',
      muscleGroups.map((identity) => ({ ...identity, ...timestamps })),
      {}
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('muscleGroups', null, {}),
};
