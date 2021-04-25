const trainingTypes = require('./data/trainingTypes.json');

module.exports = {
  up: (queryInterface) => {
    const now = new Date();
    const timestamps = {
      createdAt: now,
      updatedAt: now,
    };
    return queryInterface.bulkInsert(
      'trainingTypes',
      trainingTypes.map((identity) => ({ ...identity, ...timestamps })),
      {}
    );
  },
  down: (queryInterface) =>
    queryInterface.bulkDelete('trainingTypes', null, {}),
};
