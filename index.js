const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


require('./server/models').connect(config.dbUri);

const devEnv = process.env.NODE_ENV === 'development';

const app = express();
const webpackConfig = devEnv ? require('./webpack.config.dev') : require('./webpack.config');
const bundler = webpack(webpackConfig);

if (devEnv) {

  browserSync({
    server: {
      baseDir: './',

      middleware: [
        webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: { colors: true },
        }),
        webpackHotMiddleware(bundler),
      ],
    },
    files: [
      'css/*.css',
      '*.html',
    ],
  });
}

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

app.listen(3100, () => {
  console.log('🐼  Server is running on http://localhost:3100 🐼'); // eslint-disable-line
});
