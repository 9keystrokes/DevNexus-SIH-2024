const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require('./users_schema');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', { username, password });

  try {
    const user = await User.findOne({ username });
    console.log('User found:', user);
    if (!user) {
      return res.status(401).send({ message: 'User does not exist.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValidPassword);
    if (!isValidPassword) {
      return res.status(401).send({ message: 'Invalid password' });
    }

    return res.send({ message: 'Login successful' });
  }

  catch (error){
    console.error('Error during login:', error);
    return res.status(500).send({ message: 'An error occurred. Please try again later.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
