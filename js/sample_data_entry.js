const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./users_schema');

const createUser = async (name, email, username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, username, hashedPassword });
    await user.save();
    console.log('User created successfully');
  } catch (err) {
    console.error(err.message);
  }
};

createUser('Vashu Parashar', 'bt22csd021@iiitn.ac.in', 'vasu21', 'vasupw');
createUser('Nayan  Mandal', 'bt22csd035@iiitn.ac.in', 'nayan35', 'nayanpw');
createUser('Anuj Singh', 'bt22csd021@iiitn.ac.in', 'vasu21', 'vasupsw');
createUser('Vashu Parashar', 'bt22csd021@iiitn.ac.in', 'vasu21', 'vasupsw');
createUser('Vashu Parashar', 'bt22csd021@iiitn.ac.in', 'vasu21', 'vasupsw');