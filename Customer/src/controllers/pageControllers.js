const axios = require('axios')
const weatherData = require('../../utils/weatherdata')

exports.getHome = async (req, res) => {
  try {
    const response = await fetch('http://localhost:3000/news/allnews');
    const newsData = await response.json();
    res.render('home', { news: newsData });
  } catch (error) {
    console.error('Error fetching news data:', error);
    res.render('home', { news: [] }); 
  }
};

exports.getSports = async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/news/allnews');
    const sportsnews = response.data.filter(newsItem => newsItem.category === 'sports')
    res.render('sports', { sports:sportsnews });
  } catch (error) {
    console.error('Error fetching news data:', error);
    res.render('sports', { sports: [] }); 
  }
  
};

exports.getAbout = (req, res) => {
  try {
    res.render('about');
  } catch (error) {
    res.status(401).json("about not found")
  }
};

exports.getContact = async (req, res) => {
  try {
    res.render('contact');
  } catch (error) {
    res.status(401).json("contact not found")
  }
};

exports.getChat = async(req,res) => {
  try {
    res.render('chat');
  } catch (error) {
    res.status(401).json("chat not found")
  }
}


 exports.weather = (req, res) => {
  if (!req.query.address) {
    return res.send("Address is required");
  }
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }

    res.send(result);
  });
}

exports.getWeather = (req, res) => {
  res.render("weather");
};
