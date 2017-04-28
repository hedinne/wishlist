const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const webpack = require('webpack');
const config = require('./config');
const wpConfig = require('./webpack.config.dev');

require('./server/models').connect(process.env.MONGODB_URI || config.dbUri);

const devEnv = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3001;
const DEVPORT = process.env.DEVPORT || 3000;
const app = express();

app.use(helmet());
app.use(express.static('./build'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

// Sign up & Sign in
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStraegy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStraegy);

// Auth Check
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// Routers
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
const openListRoutes = require('./server/routes/openlist');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/openlist', openListRoutes);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Servers
if (devEnv) {
  const WebpackDevServer = require('webpack-dev-server'); // eslint-disable-line
  const compiler = webpack(wpConfig);
  const devServer = new WebpackDevServer(compiler, wpConfig.devServer);
  devServer.listen(DEVPORT, () => {
    console.log(`Dev Server: ⚡️  http://localhost:${DEVPORT} ⚡️`); // eslint-disable-line
  });
}

app.listen(PORT, () => {
  if (!devEnv) {
    console.log(`Server is running on http://localhost:${PORT}`); // eslint-disable-line
  }
});
