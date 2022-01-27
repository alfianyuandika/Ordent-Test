"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("buku", [
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed82",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
        judul: "William's Tale",
        edisi: 1,
        tanggal_terbit: "2004/12/25",
        id_genre: "1",
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed83",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d8",
        judul: "William's Journey",
        edisi: 1,
        tanggal_terbit: "2000/12/12",
        id_genre: "1",
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed84",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d9",
        judul: "Agatha's Tale",
        edisi: 1,
        tanggal_terbit: "2000/01/12",
        id_genre: "2",
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed85",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223d9",
        judul: "Agatha's Journey",
        edisi: 1,
        tanggal_terbit: "1990/05/05",
        id_genre: "2",
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed86",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223e1",
        judul: "Danielle's Tale",
        edisi: 1,
        tanggal_terbit: "1992/06/01",
        id_genre: "3",
        stok: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "76f65620-61a2-4999-9bd1-a8f347d3ed87",
        id_author: "14288c64-337d-4aac-8cb3-a3a0f9c223e1",
        judul: "Danielle's Journey",
        edisi: 1,
        tanggal_terbit: "1980/03/15",
        id_genre: "3",
        stok: 10,
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
