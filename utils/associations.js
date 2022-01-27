const { author, buku, genre, user, transaksi } = require("../db/models");

author.hasMany(buku, {foreignKey: "id_author"})
buku.belongsTo(author, {foreignKey: "id_author"})

genre.hasMany(buku, { foreignKey: "id_genre" });
buku.belongsTo(genre, { foreignKey: "id_genre" });

user.hasMany(transaksi, {foreignKey: "id_user"})
transaksi.belongsTo(user, {foreignKey: "id_user"})

buku.hasMany(transaksi, {foreignKey: "id_buku"})
transaksi.belongsTo(buku, {foreignKey: "id_buku"})
