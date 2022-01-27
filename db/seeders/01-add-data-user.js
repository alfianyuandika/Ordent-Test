"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user", [
      {
        id: "4adc4e9e-fc6b-4644-b1e6-6b6a1433a9ac",
        nama: "User1",
        email: "user1@yopmail.com",
        password: "User1_12345",
        role: "peminjam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "cf3efecf-2559-4c3b-b4e3-8d3100c8c931",
        nama: "User2",
        email: "user2@yopmail.com",
        password: "User2_12345",
        role: "peminjam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f479c1a0-cc9c-47c0-8594-24aa5557eef4",
        nama: "User3",
        email: "user3@yopmail.com",
        password: "User3_12345",
        role: "peminjam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f479c1a0-cc9c-47c0-8594-24aa5557eef5",
        nama: "User4",
        email: "user4@yopmail.com",
        password: "User4_12345",
        role: "peminjam",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "f479c1a0-cc9c-47c0-8594-24aa5557eef6",
        nama: "User5",
        email: "user5@yopmail.com",
        password: "User5_12345",
        role: "peminjam",
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
