const express = require('express');
const router = express.Router();
const Model_Pendidikan = require('../model/Model_pendidikan');
const Model_Mahasiswa = require('../model/Model_mahasiswa');


router.get('/', async function(req, res, next) {
    try {
        const pendidikans = await Model_Pendidikan.getAll();
        res.render('pendidikan/index', { data: pendidikans });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/create', async function(req, res, next) {
    try {
        
        let data = await Model_Mahasiswa.getAll(); 
        res.render('pendidikan/create', { 
            nama_instansi:'',
            jurusan:'',
            tahun_masuk:'',
            tahun_lulus:'',
            nomor_ijazah:'',
            id_mahasiswa:'',
            data: data 
        });
    } catch (error) {
        
        next(error);
    }
});

router.post('/store', async function(req, res, next) {
    try {
        let data = {
            nama_instansi: req.body.nama_instansi,
            jurusan: req.body.jurusan,
            tahun_masuk: req.body.tahun_masuk,
            tahun_lulus: req.body.tahun_lulus, 
            nomor_ijazah: req.body.nomor_ijazah, 
            id_mahasiswa: req.body.id_mahasiswa}
        await Model_Pendidikan.store(data);
        req.flash('success', 'Pendidikan created successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to create Pendidikan');
        res.redirect('/pendidikan');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    try {
        // Ambil data mahasiswa untuk ditampilkan di dropdown
        let dataMahasiswa = await Model_Mahasiswa.getAll();
        
        // Ambil ID dari parameter URL
        const id = req.params.id;

        // Ambil data pendidikan berdasarkan ID yang diberikan
        const pendidikan = await Model_Pendidikan.getById(id);

        // Periksa apakah data pendidikan ditemukan
        if (!pendidikan) {
            // Jika tidak ditemukan, kembalikan respon dengan pesan error
            return res.status(404).send('Data pendidikan tidak ditemukan');
        }

        // Render tampilan edit dengan data pendidikan dan data mahasiswa
        res.render('pendidikan/edit', {
            id: id,
            nama_instansi: pendidikan.nama_instansi,
            jurusan: pendidikan.jurusan,
            tahun_masuk: pendidikan.tahun_masuk,
            tahun_lulus: pendidikan.tahun_lulus,
            nomor_ijazah: pendidikan.nomor_ijazah,
            id_mahasiswa: pendidikan.id_mahasiswa,
            data: dataMahasiswa // Mengirimkan data mahasiswa ke dalam tampilan edit
        });
    } catch (error) {
        // Tangani error jika terjadi
        console.error(error);
        next(error); // Lanjutkan ke middleware error handling
    }
});


router.post('/update/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        let data = {
            nama_instansi: req.body.nama_instansi,
            jurusan: req.body.jurusan,
            tahun_masuk: req.body.tahun_masuk,
            tahun_lulus: req.body.tahun_lulus, 
            nomor_ijazah: req.body.nomor_ijazah, 
            id_mahasiswa: req.body.id_mahasiswa}
        await Model_Pendidikan.update(id, data);
        req.flash('success', 'Pendidikan updated successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update Pendidikan');
        res.redirect('/pendidikan');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        await Model_Pendidikan.delete(id);
        req.flash('success', 'Pendidikan deleted successfully');
        res.redirect('/pendidikan');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete Pendidikan');
        res.redirect('/pendidikan');
    }
});

module.exports = router;
