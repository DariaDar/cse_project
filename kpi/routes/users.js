var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/profile', function(req, res, next) {
    if(!req.res){
        res.redirect('/');
    }
    else {
        res.render('profile', {user: req.user});
    }
    // else if( req.user.type == "ADMIN"){
    //     res.render('admin_page', {user: req.user});
    // }
    // else if( req.user.type == "GOV_PERSON"){
    //     res.render('gov_page', {user: req.user});
    // }
    // else if( req.user.type == "PH_PERSON"){
    //     res.render('physical_page', {user: req.user});
    // }
    // else if( req.user.type == "REGISTER"){
    //     res.render('register_page', {user: req.user});
    // }
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
