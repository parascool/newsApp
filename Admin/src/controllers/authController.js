const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.redirect('/login')
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};
