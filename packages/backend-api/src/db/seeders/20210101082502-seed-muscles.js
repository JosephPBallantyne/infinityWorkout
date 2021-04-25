const muscles = require('./data/muscles.json');

module.exports = {
  up: (queryInterface) => {
    const now = new Date();
    const timestamps = {
      createdAt: now,
      updatedAt: now,
    };
    return queryInterface.bulkInsert(
      'muscles',
      muscles.map((identity) => ({ ...identity, ...timestamps })),
      {}
    );
  },
  down: (queryInterface) => queryInterface.bulkDelete('muscles', null, {}),
};
