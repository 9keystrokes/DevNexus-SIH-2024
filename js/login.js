const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend');

const User = require('./users_schema');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.redirect('http://localhost:5500/login.html?error=user_not_found');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.redirect('http://localhost:5500/login.html?error=invalid_password');
  }

  res.redirect('http://localhost:5500/main.html');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
