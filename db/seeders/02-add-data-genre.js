"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("genre", [
      {
        id: "1",
        nama_genre: "Fantasy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        nama_genre: "Adventure",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "3",
        nama_genre: "Romance",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "4",
        nama_genre: "Contemporary",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "5",
        nama_genre: "Dystopian",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "6",
        nama_genre: "Mystery",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7",
        nama_genre: "Horror",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "8",
        nama_genre: "Thriller",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "9",
        nama_genre: "Paranormal",
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
