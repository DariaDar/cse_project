var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/registration', function(req, res){
    res.render('registration');
});

router.post('/registration', function(req, res){
    //api_user.createUser(req,res);
});

router.get('/login' , function(req, res){
    res.render('login');
});

router.post('/login',
    passport.authenticate('local', {failireRedirect : '/login'}),
    function(req, res, next){
        res.redirect('./profile');
    });


//ПОДАТЬ ЗАЯВУ

router.get('/create_statement', function (req, res, next) {
   res.render('document', {user: null/*req.session.user*/});
});

router.post('/create_statement', function (req, res, next) {
   /************/
    res.render('statements', {user: req.session.user});
});

router.get('/statements', function (req, res, next) {
    res.render('statements', {user: null/*req.session.user*/});
});

module.exports = router;
