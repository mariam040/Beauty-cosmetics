const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');


// GET auth page
router.get('/auth', (req, res) => {
  res.render('auth', { message: null });
});

// GET login page (optional if needed separately)
router.get('/login', (req, res) => {
  res.render('auth', { message: null });
});

// POST signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  // ✅ Basic backend validation
  if (!name || !email || !password) {
    return res.render('auth', { message: '❌ All fields are required' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.includes('@') || !email.includes('.')) {
    return res.render('auth', { message: '❌ Please enter a valid email' });
  }
if (password.length < 6) {
  return res.render('auth', { message: '❌ Password must be at least 6 characters' });
}


  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth', { message: '❌ Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save(); // ✅ Save user

    // ✅ Show success message and go back to login form
    res.render('auth', { message: '✅ Account created successfully. You can now log in.' });

  } catch (err) {
    console.error('Signup error:', err);
    res.render('auth', { message: '❌ Signup failed. Try again.' });
  }
});

// ✅ FIXED:  login route 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
  return res.render('auth', { message: '❌ Email and password are required' });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.render('auth', { message: '❌ Please enter a valid email' });
}

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('auth', { message: 'Email not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.user = user;
      return res.redirect('/homepage');
    } else {
      return res.render('auth', { message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('❌ Login error:', err);
    res.render('auth', { message: 'Login failed. Try again.' });
  }
});


module.exports = router;