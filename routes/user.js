const express = require("express");
var bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());

const User = require("../controllers/User");

router.get('/login', (req, res) => {
    res.render('login', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/signup', (req, res) => {
    res.render('signup', { user: (req.session.user === undefined ? "" : req.session.user) });
});


router.post('/profile', User.GetUser);
router.post('/signup', User.AddUser);
router.post('/checkUN', User.checkUN);


// check if logged in
router.use((req, res, next) => {
    if (req.session.user !== undefined) {
        next();
    }
    else {
        res.render('err', { err: 'You must login to access this page', user: (req.session.user === undefined ? "" : req.session.user) })
    }
});

router.get('/profile', (req, res) => {
    res.render('profile', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.get('/editProfile', (req, res) => {
    res.render('editProfile', { user: (req.session.user === undefined ? "" : req.session.user) });
});

router.post('/editProfile', User.editUser);
// router.get("/delete/:img/:id", User.DeleteUser);
router.get('/deleteMe', User.deleteMyAccount);


module.exports = router;