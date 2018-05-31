var express = require('express');
var router = express.Router();
const passport = require('passport');
var busboyBodyParser = require('busboy-body-parser');
var bodyParser = require('body-parser');
var parseForm = bodyParser.urlencoded({extended: false});
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment')

var db = mongoose.connect('mongodb://localhost/mydb');

var GovUser = require('../modules/gov_person.js');
var PhUser = require('../modules/ph_person.js');
var User = require('../modules/user.js');
var Address = require('../modules/address.js');
var Bank = require('../modules/bank.js');
var Document = require('../modules/document.js');
var Media = require('../modules/media.js');



// const salt = '45%sALT_';
// function hash(text){
//     return crypto.createHash('sha1')
//         .update(text + salt).digest('base64')
// }

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Welcome', user: req.session.user});
});

router.get('/registration', function (req, res) {
    res.render('registration', {user: req.session.user});
});


//РЕГИСТРАЦИЯ
router.post('/registration', function (req, res, next) {
    if (req.body.type == "gov") {
        var company_address = new Address({
            country: req.body.country,
            region: req.body.region,
            locality: req.body.locality,
            street: req.body.street,
            building: req.body.building
        });

        company_address.save(function (err) {
            if (err) return next(err);
        });
        console.log('Address successfully saved.');
        console.log(company_address);

        var bank_details = new Bank({
            card_number: req.body.cardcode,
            owner_name: req.body.leader_card_name,
            owner_surname: req.body.leader_card_surname,
            cvc_code: req.body.leader_cvc,
            date_month: req.body.cvc_mm,
            date_year: req.body.cvc_yy
        });
        bank_details.save(function (err) {
            if (err) return next(err);
        });
        console.log('Bank successfully saved.');

        var govPerson = new GovUser({
            company_name: req.body.company_name,
            company_address: company_address._id,
            company_number: req.body.company_number,
            leader_name: req.body.leader_name,
            leader_parentname: req.body.leader_parent_name,
            leader_surname: req.body.leader_surname,
            leader_email: req.body.leader_email,
            bank_details: bank_details._id
        });
        govPerson.save(function (err) {
            if (err) return next(err);
        });
        console.log('User successfully saved.');


        var user_loc = new User({
            login: req.body.username,
            password_temp: req.body.password1,
            type: req.body.type,
            id_person: govPerson._id
        });

        user_loc.save(function (err) {
            if (err) return next(err);
        });
        req.session.user = user_loc;

        console.log('User successfully saved.');
        Address.findOneAndUpdate({_id: company_address._id}, {person: user_loc._id}, function (err) {
            if (err) {
                console.log("Mistake UPDATING address");
                return next(err);
            }
        });

        Bank.findOneAndUpdate({_id: bank_details._id}, {person: user_loc._id}, function (err) {
            if (err) {
                console.log("Mistake UPDATING bank");
                return next(err);
            }
        });

        return res.redirect('/users/profile/' + user_loc._id);

    } else if (req.body.type == "physical") {
        var address = new Address({
            country: req.body.person_country,
            region: req.body.person_region,
            locality: req.body.person_locality,
            street: req.body.person_street,
            building: req.body.person_building
        });

        address.save(function (err) {
            if (err) return next(err);
        });
        console.log('Address person successfully saved.');

        var bank_details_p = new Bank({
            card_number: req.body.person_cardcode,
            owner_name: req.body.person_card_name,
            owner_surname: req.body.person_card_surname,
            cvc_code: req.body.person_cvc,
            date_month: req.body.p_cvc_mm,
            date_year: req.body.p_cvc__yy
        });
        bank_details_p.save(function (err) {
            if (err) return next(err);
        });
        console.log('Bank person successfully saved.');

        var person = new PhUser({
            first_name: req.body.person_name,
            parent_name: req.body.person_parent_name,
            surname: req.body.person_surname,
            person_number: req.body.person_number,
            email: req.body.person_email,
            passport_number: req.body.passport_number,
            passport_series: req.body.passport_series,
            bank_details: bank_details_p._id,
            address: address._id
        });
        person.save(function (err) {
            if (err) return next(err);
        });
        console.log('Person successfully saved.');

        var user_p = new User({
            login: req.body.username,
            password_temp: req.body.password1,
            type: req.body.type,
            id_person: person._id
        });
        user_p.save(function (err) {
            if (err) return next(err);
        });
        req.session.user = user_p;
        console.log('User person successfully saved.');
        Address.findOneAndUpdate({_id: address._id}, {person: user_p._id}, function (err) {
            if (err) {
                console.log("Mistake UPDATING address person");
                return next(err);
            }
        });

        Bank.findOneAndUpdate({_id: bank_details_p._id}, {person: user_p._id}, function (err) {
            if (err) {
                console.log("Mistake UPDATING bank person");
                return next(err);
            }
        });

        return res.redirect('/users/profile/' + user_p._id);
    }
    else {
        console.log("Mistake");
    }
});

router.get('/login', function (req, res) {
    res.render('login');
});

router.post('/login', function (req, res, next) {
    var username = req.body.login;
    var password = req.body.password;
    console.log(username, password);
    User.findOne({login: username}, function (err, user) {
        if(user) {
            console.log(user.login);
            if(user.checkPassword(password)) {
                req.session.user = user;
                res.redirect('/users/profile/' + user._id);
            }
            else if(err) {
                return next(err);
            }
            else{
                return res.sendStatus(404);
            }
        }
        else{
            return res.sendStatus(404);
        }
    })
});

router.get('/logout', function(req, res, next) {
    if (req.session.user) {
        delete req.session.user;
        res.redirect('/');
    }
});

router.get('/register', function (req, res) {
    res.render('register', {user: null});
});

router.get('/document/:id', function (req, res) {
    var id = req.params.id;
    Document.findById(id, function (err, document) {
        if(err) return next(err);
        Address.findById(document.redaction_office, function (err, address) {
            res.render('w_document', {user: req.session.user, document: document, address: address});
        })

    })

});

router.get('/user_settings', function (req, res, next) {
    if(req.session.user)
        getUser('user_settings', req, res, next);
    else return res.redirect('/');
});

router.post('/settings', function (req, res, next) {
    // id = req.session.user._id;
    // User.findOneAndUpdate({_id: id},{
    //     login: req.session.username
    // }, function (err, user) {
    //     if(err) return next(err);
    //     console.log(user.login);
    //     if(user.type == "gov") {
    //         GovUser.findOneAndUpdate({_id: user.id_person}, {
    //
    //         }, function (err, user) {
    //             if(err) return next(err);
    //         })
    //     }
    //     else {
    //
    //     }
    // });
});

router.get('/vidomosti', function (req, res, next) {
    var user = req.session.user;
    var now = moment();

    Document.findOne({id_founder: user._id}, function (err, doc) {
        if (err) return next(err);
        //     var media = new Media({
        //         founder: "Кабановський Євген Михайлович",
        //         number: 12345,
        //         register: "Міністерство юстиції України, м.Київ",
        //         date: now.format('LLLL'),
        //         name: "Солоденький кабанчик",
        //         type:"Журнал",
        //         document: doc._id
        //
        //     });
        //
        //     media.save(function (err) {
        //         if(err) return next(err);
        //     });
        // })


        Media.findOne({founder: user._id}, function (err, media) {
            if (err) return next(err);

            User.findById(user._id, function (err, user) {
                if (err) return next(err);
                if (user.type == "gov") {
                    GovUser.findById(user.id_person, function (err, person) {
                        if (err) return next(err);
                        media.person_name = person.company_name;
                        Document.findById(media.document, function (err, doc) {
                            if (err) return next(err);
                            media.media_name = doc.name;
                            res.render('vidomosti', {user: req.session.user, media: media});
                        });
                    })
                } else {
                    PhUser.findById(user.id_person, function (err, person) {
                        if (err) return next(err);
                        media.person_name = person.surname + " " + person.first_name + " " + person.parent_name;
                        Document.findById(media.document, function (err, doc) {
                            if (err) return next(err);
                            media.media_name = doc.name;
                            res.render('vidomosti', {user: req.session.user, media: media});
                        });
                    })
                }
            })
        })


    });
});

router.post('/getmedia', function (req, res, next) {
    var type = req.body.type;
    console.log(type);
    var name = req.body.namesearch;
    Media.findOne({type: type}, function (err, media) {
        console.log(media.type);
        if(err) return next(err);
        if(media) {
            res.render('journal', {user: req.session.user, media: media})
        }
        else {
            res.render('nothing', {user: req.session.user})
        }

    })
});

//ПОДАТЬ ЗАЯВУ

router.get('/create_statement', function (req, res, next) {
    getUser('document', req, res, next);
    // res.render('document', {user: req.session.user});
});

router.post('/create_statement', function (req, res, next) {
    var register = "Міністерство юстиції України, м.Київ";
    var address = new Address({
        country : req.body.media_country,
        region : req.body.media_region,
        locality : req.body.media_locality,
        street : req.body.media_street,
        building : req.body.media_building
    });

    address.save(function (err) {
        if (err) return next(err);
    });

    var now = moment();
    moment.locale('ua');

    console.log( req.body.media_type);
    console.log(req.body.media_name);
    console.log(req.body.sphere);
    var statement = new Document({
        register: register,
        id_founder : req.session.user._id,
        type: req.body.media_type,
        name: req.body.media_name,
        language: req.body.language,
        sphere: req.body.sphere,
        readers_category: req.body.readers_category,
        aims: req.body.prinzipy,
        theme: req.body.theme,
        period: req.body.period,
        paper_size: req.body.size_sheet,
        amount: req.body.page_count,
        redaction_office: address._id,
        start_reg_date : now.format('LLLL'),
        ready_reg_date : now.format('LLLL'),
        status : 'PROCESSED',
        file: req.body.document
    });

    statement.save(function (err) {
        if (err) return next(err);
    });

    res.redirect('/statements');
});


router.get('/statements', function (req, res, next) {
    var user = req.session.user;
    Document.find({id_founder: user}, function (err, documents) {
       if(err) return next(err);
        res.render('statements', {user: user, statements: documents});
    });

});

router.get('/modify_statement/:id', function (req, res, next) {
    var id = req.params.id;
    Document.findById(id, function (err, document) {
        if(err) return next(err);
        if(!document) return res.send(404);
        Address.findById(document.redaction_office, function (err, address) {
            res.render('modify', {user: req.session.user, document: document, address: address});

        })
    })
});

router.post('/modify', function (req, res, next) {
    var document_id = req.body.statement_id;
    var address_id = req.body.address_id;

    Address.findOneAndUpdate({_id: address_id}, {
        country : req.body.media_country,
        region : req.body.media_region,
        locality : req.body.media_locality,
        street : req.body.media_street,
        building : req.body.media_building
    }, function (err, address) {
        if(err) return next(err);
    });
    var now = moment();
    moment.locale('ua');

    Document.findOneAndUpdate({_id: document_id}, {
        type: req.body.media_type,
        name: req.body.media_name,
        language: req.body.language,
        sphere: req.body.sphere,
        readers_category: req.body.readers_category,
        aims: req.body.prinzipy,
        theme: req.body.theme,
        period: req.body.period,
        paper_size: req.body.size_sheet,
        amount: req.body.page_count,
        start_reg_date : now.format('LLLL'),
        file : req.body.document
    }, function (err) {
        if(err) return next(err);
    })
    return res.redirect('/document/' + document_id);
})

router.post('/delete_statement', function (req, res, next) {
    var id = req.body.statement_id;
    console.log(id);
    Document.findById(id, function (err, document) {
        if(err) return next(err);
        if(!document) return res.send(404);
        else {
            document.remove(function (err) {
                if(err) return next(err);
                res.redirect('statements');
            })
        }
    })

})





function getUser(str, req, res, next) {
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
                            return res.render(str, {user: req.session.user, user2: user,  person: gov_person, address: address, bank: bank_details});
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
                            return res.render(str, {user: req.session.user, user2: user, person: physical_person, address: address, bank: bank_details})
                        })
                    })
                })
            }
        }
    });
}

module.exports = router;
