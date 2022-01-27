'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  buku.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_author: DataTypes.INTEGER,
    judul: DataTypes.STRING,
    edisi: DataTypes.STRING,
    tanggal_terbit: DataTypes.DATE,
    id_genre: DataTypes.INTEGER,
    stok: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'buku',
  });
  return buku;
};
