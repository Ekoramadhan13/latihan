const express = require('express');
const app = express();
const port = process.env.PORT || 5200;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CREATE - Tambah Penyewa
app.post('/penyewa', async (req, res) => {
  const { nama, no_hp, alamat } = req.body;

  if (!nama || !no_hp || !alamat) {
    return res.status(400).json({ error: 'Field nama, no_hp, dan alamat wajib diisi' });
  }

  try {
    const penyewa = await db.Penyewa.create({ nama, no_hp, alamat });
    res.status(201).json(penyewa);
  } catch (error) {
    console.error('POST /penyewa error:', error);
    res.status(500).json({ error: 'Gagal menambahkan penyewa', details: error.message });
  }
});

// READ ALL - Ambil Semua Penyewa
app.get('/penyewa', async (req, res) => {
  try {
    const penyewas = await db.Penyewa.findAll();
    res.status(200).json(penyewas);
  } catch (error) {
    console.error('GET /penyewa error:', error);
    res.status(500).json({ error: 'Gagal mengambil data penyewa' });
  }
});

// READ BY ID - Ambil Penyewa Berdasarkan ID
app.get('/penyewa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const penyewa = await db.Penyewa.findByPk(id);
    if (!penyewa) {
      return res.status(404).json({ error: 'Penyewa tidak ditemukan' });
    }
    res.status(200).json(penyewa);
  } catch (error) {
    console.error(`GET /penyewa/${id} error:`, error);
    res.status(500).json({ error: 'Gagal mengambil data penyewa' });
  }
});

// UPDATE - Ubah Data Penyewa
app.put('/penyewa/:id', async (req, res) => {
  const id = req.params.id;
  const { nama, no_hp, alamat } = req.body;

  try {
    const penyewa = await db.Penyewa.findByPk(id);
    if (!penyewa) return res.status(404).json({ error: 'Penyewa tidak ditemukan' });

    await penyewa.update({ nama, no_hp, alamat });
    res.status(200).json(penyewa);
  } catch (error) {
    console.error(`PUT /penyewa/${id} error:`, error);
    res.status(500).json({ error: 'Gagal memperbarui data penyewa' });
  }
});

// DELETE - Hapus Data Penyewa
app.delete('/penyewa/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const penyewa = await db.Penyewa.findByPk(id);
    if (!penyewa) return res.status(404).json({ error: 'Penyewa tidak ditemukan' });

    await penyewa.destroy();
    res.status(200).json({ message: 'Penyewa berhasil dihapus' });
  } catch (error) {
    console.error(`DELETE /penyewa/${id} error:`, error);
    res.status(500).json({ error: 'Gagal menghapus data penyewa' });
  }
});

// INIT DB & RUN SERVER
db.sequelize
  .authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server is running at: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });
