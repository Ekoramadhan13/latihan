module.exports = (sequelize, DataTypes) => {
  const Penyewa = sequelize.define('Penyewa', {
    id_penyewa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_hp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "penyewa",       // nama tabel di MySQL
    freezeTableName: true,      // biar Sequelize gak ubah jadi jamak
    timestamps: false,           // otomatis buat kolom createdAt dan updatedAt
  });

  return Penyewa;
};
