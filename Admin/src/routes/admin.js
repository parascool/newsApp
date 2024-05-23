const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { addNewsForm, addNews, editNewsForm, editNews, deleteNews, showNews, getAllNews } = require('../controllers/newsController');
const auth = require('../middleware/auth');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);
router.get('/login', (req, res) => res.render('login'));
router.post('/login', login);
router.get('/logout', logout);

router.get('/dashboard', auth, showNews);
router.get('/news/add', auth, addNewsForm);
router.post('/news/add', auth, addNews);
router.get('/news/edit/:id', auth, editNewsForm);
router.post('/news/edit/:id', auth, editNews);
router.post('/news/delete/:id', auth, deleteNews);
router.get('/news/allnews', getAllNews); 

module.exports = router;
