var express = require('express');
var router = express.Router();
const Model_Mahasiswa = require('../model/Model_mahasiswa');

router.get('/', async function(req, res, next) {
    let rows = await Model_Mahasiswa.getAll();
    res.render('mahasiswa/index', {
        data: rows
    });
});

router.get('/create', function(req, res, next) {
    res.render('mahasiswa/create', {
        nrp :'',
        nama_depan:'',
        nama_belakang:'',
        jenis_kelamin:'', 
        agama:'' ,
        umur:'' ,
        tinggi_badan:'', 
        gol_darah:'', 
        alamat:'',
        hobi:'', 
        email:'', 
        no_telpon:'' 
    });
});

router.post('/store', async function(req, res, next) {
    try {
        let data = {
            nrp: req.body.nrp,
            nama_depan: req.body.nama_depan,
            nama_belakang: req.body.nama_belakang,
            jenis_kelamin: req.body.jenis_kelamin, 
            agama: req.body.agama, 
            umur: req.body.umur, 
            tinggi_badan: req.body.tinggi_badan, 
            gol_darah: req.body.gol_darah, 
            alamat: req.body.alamat,
            hobi: req.body.hobi, 
            email: req.body.email, 
            no_telpon: req.body.no_telpon}
        await Model_Mahasiswa.store(data);
        req.flash('success', 'Data berhasil disimpan');
        res.redirect('/mahasiswa');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan');
        res.redirect('/mahasiswa');
    }
});

router.get('/edit/:id', async function(req, res, next) {
    let id = req.params.id;
    let rows = await Model_Mahasiswa.getById(id);
    res.render('mahasiswa/edit', {
        id: rows[0].id_mahasiswa,
        nrp: rows[0].nrp,
        nama_depan: rows[0].nama_depan,
        nama_belakang: rows[0].nama_belakang,
        jenis_kelamin: rows[0].jenis_kelamin,
        agama: rows[0].agama,
        umur: rows[0].umur,
        tinggi_badan: rows[0].tinggi_badan,
        gol_darah: rows[0].gol_darah,
        alamat: rows[0].alamat,
        hobi: rows[0].hobi,
        email: rows[0].email,
        no_telpon: rows[0].no_telpon
    });
});

router.post('/update/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let data = {
            nrp: req.body.nrp,
            nama_depan: req.body.nama_depan,
            nama_belakang: req.body.nama_belakang,
            jenis_kelamin: req.body.jenis_kelamin, 
            agama: req.body.agama, 
            umur: req.body.umur, 
            tinggi_badan: req.body.tinggi_badan, 
            gol_darah: req.body.gol_darah, 
            alamat: req.body.alamat,
            hobi: req.body.hobi, 
            email: req.body.email, 
            no_telpon: req.body.no_telpon}
        await Model_Mahasiswa.update(id, data);
        req.flash('success', 'Data berhasil diperbarui');
        res.redirect('/mahasiswa');
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan');
        res.redirect('/mahasiswa');
    }
});

router.get('/delete/:id', async function(req, res, next) {
    let id = req.params.id;
    await Model_Mahasiswa.delete(id);
    req.flash('success', 'Data berhasil dihapus');
    res.redirect('/mahasiswa');
});

module.exports = router;
