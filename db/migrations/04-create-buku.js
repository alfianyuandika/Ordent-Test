'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buku', {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: Sequelize.UUID,
      },
      id_author: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING
      },
      edisi: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tanggal_terbit: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_genre: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      stok: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("buku", {
      fields: ["id_author"],
      type: "foreign key",
      name: "custom_fkey_id_author",
      references: {
        table: "author",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("buku", {
      fields: ["id_genre"],
      type: "foreign key",
      name: "custom_fkey_id_genre",
      references: {
        table: "genre",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('buku');
  }
};
