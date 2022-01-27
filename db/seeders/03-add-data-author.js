"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("author", [
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
        nama: "William Shakespeare",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223d9",
        nama: "Agatha Christie",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e0",
        nama: "Barbara Cartland",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e1",
        nama: "Danielle Steel",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e2",
        nama: "Harold Robbins",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e3",
        nama: "Sidney Sheldon",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e4",
        nama: "J. K. Rowling",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "14288c64-337d-4aac-8cb3-a3a0f9c223e5",
        nama: "Dr. Seuss",
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
