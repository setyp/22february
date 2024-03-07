var express = require('express');
var router = express.Router();
const Model_Kategori = require('../model/Model_Kategori.js');
var connection = require('../config/database.js');

router.get('/', async function(req, res, next){
    let rows = await Model_Kategori.getAll();
    
            res.render('kategori/index',{
                data: rows
            });   
});

router.get('/create' , function(req, res, next){
    res.render('kategori/create',{
        nama_kategori: ''
    })
});

router.post('/store' , async function(req, res, next){
    try{
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        await Model_Kategori.Store(data);
            req.flash('succes','berhasil')
            res.redirect('/kategori')
    }catch{
        req.flash('error','salah fungsi')
        res.redirect('/kategori')
    }
});

router.get('/edit/(:id)' , async function(req, res, next){
    let id = req.params.id;
    let rows = await Model_Kategori.getid(id);
            res.render('kategori/edit',{
                id: rows[0].id_kategori,
                nama_kategori: rows[0].nama_kategori
         
    })
});

router.post('/update/(:id)' , async function(req, res, next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        await Model_Kategori.Update(id, data);
        
            req.flash('succes','berhasil')
            res.redirect('/kategori')        
    }catch{
        req.flash('error','salah fungsi')
        res.redirect('/kategori')
    }
});

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_Kategori.Delete(id);
        req.flash('success', 'Data terhapus!');
        res.redirect('/kategori');
});

module.exports = router;