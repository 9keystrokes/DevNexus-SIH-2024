const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://1nayanmandal:mongoatlas@login-backend.orqrz.mongodb.net/?retryWrites=true&w=majority&appName=login-backend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const user = require('./users_schema');

app.use(express.json());

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    res.render('login', { error: 'Invalid username or password' });
  } else {
    res.send({ message: 'Login successful' });
  }

  res.send({ message: 'Login successful' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});