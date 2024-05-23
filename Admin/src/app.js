const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI);

app.set('view engine', 'ejs');
// app.set('views', './src/views');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', adminRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
