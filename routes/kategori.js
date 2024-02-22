var express = require('express');
var router = express.Router();

var connection = require('../config/database.js');

router.get('/', function(req, res, next){
    connection.query('select * from kategori order by id_kategori desc', function(err, rows){
        if(err){
            req.flash('error',err);
        }else{
            res.render('kategori/index',{
                data: rows
            });
        }
    });
});

router.get('/create' , function(req, res, next){
    res.render('kategori/create',{
        nama_kategori: ''
    })
});

router.post('/store' , function(req, res, next){
    try{
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        connection.query('insert into kategori set ?', data, function(err, result){
            if(err){
                req.flash('error','gagal')
            }else{
                req.flash('succes','berhasil')
            }res.redirect('/kategori')
        })
    }catch{
        req.flash('error','salah fungsi')
        res.redirect('/kategori')
    }
});

router.get('/edit/(:id)' , function(req, res, next){
    let id = req.params.id;
    connection.query('select * from kategori where id_kategori =' +id, function(err, result){
        if(err){
            req.flash('error','gagal')
        }else{
            res.render('kategori/edit',{
                id: result[0].id_kategori,
                nama_kategori: result[0].nama_kategori
            })
        }
    })
});

router.post('/update/(:id)' , function(req, res, next){
    try{
        let id = req.params.id;
        let {nama_kategori} = req.body;
        let data = {
            nama_kategori
        }
        connection.query('UPDATE kategori SET ? WHERE id_kategori = ?', [data, id] ,function(err, result){
            if(err){
                req.flash('error','gagal')
            }else{
                req.flash('succes','berhasil')
            }res.redirect('/kategori')
        })
    }catch{
        req.flash('error','salah fungsi')
        res.redirect('/kategori')
    }
});

router.get('/delete/(:id)', function (req, res) {
    let id = req.params.id;
    connection.query('DELETE FROM kategori WHERE id_kategori = ' + id, function (err) {
        if (err) {
            req.flash('error', 'Gagal Menghapus data');
        } else {
            req.flash('success', 'Data terhapus!');
        }
        res.redirect('/kategori');
    });
});

module.exports = router;