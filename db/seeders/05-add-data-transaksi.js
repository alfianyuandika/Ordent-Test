"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("transaksi", [
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76414",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed82",
        id_user: "4adc4e9e-fc6b-4644-b1e6-6b6a1433a9ac",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76415",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed83",
        id_user: "cf3efecf-2559-4c3b-b4e3-8d3100c8c931",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76416",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed84",
        id_user: "f479c1a0-cc9c-47c0-8594-24aa5557eef4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76417",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed85",
        id_user: "f479c1a0-cc9c-47c0-8594-24aa5557eef4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76418",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed86",
        id_user: "f479c1a0-cc9c-47c0-8594-24aa5557eef5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "753d1844-d95a-44da-b22f-e12a98e76419",
        id_buku: "76f65620-61a2-4999-9bd1-a8f347d3ed87",
        id_user: "f479c1a0-cc9c-47c0-8594-24aa5557eef6",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
