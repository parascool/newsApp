const News = require('../models/news');

exports.addNewsForm = (req, res) => {
  res.render('addNews');
};

exports.addNews = async (req, res) => {

  try {
    const { title, content, category } = req.body;

    const newNews = new News({
      title,
      content,
      category
    });

    await newNews.save();
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: 'Error adding news' });
  }
};

exports.editNewsForm = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    res.render('editNews', { news });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
};

exports.editNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndUpdate(id, req.body);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while editing news' });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    await News.findByIdAndDelete(id);
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting news' });
  }
};

exports.showNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.render('dashboard', { news });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching news' });
  }
};

exports.getAllNews = async (req, res) => {
  try {
    const currentDate = new Date();
    const latestNews = await News.find({ date: { $lte: currentDate } })
    // .sort({ date: -1 }).limit(3);
    res.status(200).json(latestNews);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching latest news' });
  }
};
