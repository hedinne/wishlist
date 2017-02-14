const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/auth');

const app = express();

app.use(express.static('./server/static'));
app.use(express.static('./client/dist'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRoutes)


app.listen(3000, () => {
  console.log('🐼  Server is running on http://localhost:3000');
});
