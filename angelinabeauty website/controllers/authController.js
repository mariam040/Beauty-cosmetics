const jwt = require('jsonwebtoken');
const User = require('../model/user');
const asyncHandler = require('express-async-handler');

// @desc    Authenticate admin
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, role: 'admin' });

  if (user && (await user.comparePassword(password))) {
    // ✅ Set user in session
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    // Optional: Generate JWT if needed
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ✅ Redirect to admin page
    res.redirect('/admin');
  } else {
    res.status(401).render('auth', { error: 'Invalid credentials' });
  }
});
const signupUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).render('auth', { error: 'Email already exists' });
  }

  await User.create({ name, email, password });

  // ✅ Show success message
  res.render('auth', { message: 'Account created successfully! You can now log in.' });
});
// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
const logoutAdmin = asyncHandler(async (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Logout error');
    }
    res.redirect('/auth');
  });
});

module.exports = {
  loginAdmin,
  logoutAdmin,
  signupUser
};
