const express = require('express');
const router = express.Router();
const { getHome, getSports, getAbout, getContact, getWeather, weather, getChat } = require('../controllers/pageControllers');


router.get('/', getHome);
router.get('/sports', getSports);
router.get('/about', getAbout);
router.get('/contact', getContact);
router.get('/getWeather', getWeather)
router.get('/weather', weather);
router.get('/chat', getChat);


module.exports = router;