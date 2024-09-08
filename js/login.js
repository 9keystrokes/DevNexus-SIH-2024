const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./users_schema');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests are allowed' });
  }

  {
  const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send({ message: 'User does not exist.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    return res.send({ message: 'Login successful' });
  }
}
