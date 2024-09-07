const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./users');

const createUser = async (name, email, username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, password: hashedPassword });
    await user.save();
    console.log('User created successfully');
  } catch (err) {
    console.error(err.message);
  }
};

createUser('John Doe', 'johndoe2@example.com', 'john_doe2', 'password123');