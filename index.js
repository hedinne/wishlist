const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const webpack = require('webpack');
const wpConfig = require('./webpack.config.dev');

require('./server/models').connect(process.env.MONGODB_URI || config.dbUri);

const devEnv = process.env.NODE_ENV === 'development';
const PORT = (process.env.NODE_ENV === 'production') ? 5000 : 3000;
const DEVPORT = process.env.DEVPORT || 3001;
const app = express();

app.use(express.static('./build'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());


const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStraegy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStraegy);

const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);


// Muna að eyða!!!!!
const Users = require('mongoose').model('User');
app.get('/users', (req, res) => {
  Users.find((err, user) => {
    if (err) { console.log(err); }
    return res.send(user);
  });
});
//

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

if (devEnv) {
  const WebpackDevServer = require('webpack-dev-server');
  const compiler = webpack(wpConfig);
  const devServer = new WebpackDevServer(compiler, wpConfig.devServer);
  devServer.listen(DEVPORT, () => {
    console.log(`Server is running on 🦊  http://localhost:${DEVPORT} 🦊`); // eslint-disable-line
  });
}

app.listen(PORT, () => {
  if (!devEnv) {
    console.log(`🐼  Server is running on http://localhost:${PORT} 🐼`); // eslint-disable-line
  }
});
