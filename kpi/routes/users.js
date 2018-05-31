var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({ extended: false });
var busboyBodyParser = require('busboy-body-parser');

var User = require('../modules/user.js');
var GovUser = require('../modules/gov_person.js');
var PhUser = require('../modules/ph_person.js');
var Address = require('../modules/address.js');
var Bank = require('../modules/bank.js');
var Document = require('../modules/document.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET USER

function getUser(str, req, res, next, documents) {
    var id = req.params.id;
    console.log(id);
    if(!id)
        id = req.session.user._id;
    User.findById(id, function (err, user) {
        if(err) return next(err);
        if(!user) return res.send(404);
        if(user) {
            if(user.type == "gov") {
                GovUser.findById(user.id_person, function (err, gov_person) {
                    if(err) return next(err);
                    Address.findById(gov_person.company_address, function (err, address) {
                        if(err) return next(err);

                        Bank.findById(gov_person.bank_details, function (err, bank_details) {
                            if(err) return next(err);
                            return res.render(str, {user: req.session.user, user2: user,  person: gov_person, address: address, statements: documents, bank: bank_details});
                        })
                    })
                })
            } else {
                PhUser.findById(user.id_person, function (err, physical_person) {
                    if(err) return next(err);
                    Address.findById(physical_person.address, function (err, address) {
                        if(err) return next(err);
                        Bank.findById(physical_person.bank_details, function (err, bank_details) {
                            if(err) return next(err);
                            return res.render(str, {user: req.session.user, user2: user, person: physical_person, address: address, statements: documents, bank: bank_details})
                        })
                    })
                })
            }
        }
    });
}

router.get('/profile/:id', function(req, res, next) {
    var id = req.params.id;
    if(!id)
        id = 0;
    Document.find({id_founder: id}, function (err, documents) {
        if(err) return next(err);
        getUser('profile', req, res, next, documents);
    });


    // var id = req.params.id;
    // console.log(id);
    // User.findById(id, function (err, user) {
    //     if(err) return next(err);
    //     if(!user) return res.send(404);
    //     if(user) {
    //         if(user.type == "gov") {
    //             GovUser.findById(user.id_person, function (err, gov_person) {
    //                 if(err) return next(err);
    //                 Address.findById(gov_person.company_address, function (err, address) {
    //                     if(err) return next(err);
    //
    //                     Bank.findById(gov_person.bank_details, function (err, bank_details) {
    //                         if(err) return next(err);
    //                         return res.render('profile', {user: req.session.user, user2: user,  person: gov_person, address: address, bank: bank_details});
    //                     })
    //                 })
    //             })
    //         } else {
    //             PhUser.findById(user.id_person, function (err, physical_person) {
    //                 if(err) return next(err);
    //                 Address.findById(physical_person.address, function (err, address) {
    //                     if(err) return next(err);
    //                     Bank.findById(physical_person.bank_details, function (err, bank_details) {
    //                         if(err) return next(err);
    //                         return res.render('profile', {user: req.session.user, user2: user, person: physical_person, address: address, bank: bank_details})
    //                     })
    //                 })
    //             })
    //         }
    //     }
    // });
});

router.get('/logout', function(req, res, next){
    req.logout();
    res.redirect('/');
});

router.get('/documents', function(req, res){
    if(!req.user){
        res.redirect('/');
    }
    else if(req.user.type == "GOV_PERSON" || req.user.type == "PH_PERSON" ){
        Document
            .find({id_founder : user._id}).sort({"start_date" : 1})
            .exec(function(err,statements){
                if(!err){
                    res.render('profile', {user : req.session.user, statements : user.statement});
                }
                else res.status(500).end();
            })
    }
});

router.post('/modify', function(req, res){
    //api_user.modifyUser(req,res);
});

router.get('/modify', function(req, res){
    res.render('modifyUser', {user : req.user});
});

router.post('/documents/applying/delete/:id', function(req, res, next){
    if(!req.user)
        return res.redirect('/');
    Document
        .findbyId(req.params.id, function(err, statement){
            if(err) return next(err);
            if(!statement) return res.send(404);
            else{
                statement.remove(function(err){
                    if(err) return next(err);
                    else res.redirect('statements')
                })
            }
        })
});

module.exports = router;
