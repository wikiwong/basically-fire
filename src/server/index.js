import express from 'express';
import session from 'express-session';
import validator from 'express-validator';
import bodyParser from 'body-parser';
import flash from 'connect-flash';
import morgan from 'morgan';
import 'ignore-styles';

// user login
import passport from 'passport';
import mongoose from 'mongoose';

import uiController from './controllers/ui';
import authController from './controllers/auth';

import webpack from 'webpack';
import devWebpackConfig from '../../configs/webpack.dev.config';

const PORT = 8080;

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/basically-fire');


const app = express();

if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(devWebpackConfig);
    const middleware = require('webpack-dev-middleware')(compiler, {
        publicPath: devWebpackConfig.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(require('webpack-hot-middleware')(compiler));
}

// logging
// app.use(morgan('combined'));

// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(validator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// session management
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// connect-flash middleware for special session storage
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// serve up public assets
// app.use('/assets', express.static('public'));

app.use('/auth', authController);
app.use('/', uiController);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
});
