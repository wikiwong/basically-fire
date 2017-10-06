import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';
import { getEmailVerification } from '../email-verification';

const router = express.Router();

const passportAuthenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      return res.status(400).json(info);
    } else {
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.json({
          username: user.username,
          email: user.email
        });
      });
    }
  })(req, res, next);
};

const genericErrorMessage = { username: "password not valid for this user" };
passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
    User.getUserByUserName(username, (err, user) => {
      if (err) {
        throw err;
      }
      if (!user) {
        done(null, false, genericErrorMessage);
      } else {
        User.comparePassword(password, user.password, (err, isMatch) => {
          if (err) {
            done(err, false, { message: 'Unknown error' });
          }
          if(isMatch) {
            done(null, user)
          } else {
            done(null, false, genericErrorMessage);
          }
        });
      }
    })
  }
));

passport.serializeUser((user, done) => {
  const { id, email, username } = user;
  done(null, { id, email, username });
});

passport.deserializeUser((userSession, done) => {
  const { id } = userSession;
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login', (req, res, next) => {
  passportAuthenticate(req, res, next);
});

router.post('/register', (req, res, next) => {
  const emailVerification = getEmailVerification();
  const { username, email, password } = req.body;
  if (username && email && password) {
    const newUser = new User({ username, email, password });

    emailVerification.createTempUser(newUser, (err, existingPersistentUser, newTempUser) => {
        if (err) { return next(err); }
        if (existingPersistentUser) {
          return res.json({
            error: 'Existing persistent user'
          });
        }

        if (newTempUser) {
          const url = newTempUser[emailVerification.options.URLFieldName];
          emailVerification.sendVerificationEmail(email, url, (err, info) => {
            if (err) {
              console.error(err);
              return next(err);
            }
            res.json({});
          });
        } else {
          res.send('User already pending registration exists!');
        }
    });
  }
});

router.get('/verify/:token', (req, res, next) => {
  const emailVerification = getEmailVerification();
  console.info(req.params.token);
  emailVerification.confirmTempUser(req.params.token, (err, user) => {
    if (err) { return next(err); }
    // user was found!
    if (user) {
      emailVerification.sendConfirmationEmail(user['email'], (err, info) => {
        res.send('YAY');
      });
    // probably expired
    } else {

    }
  });
});

router.post('/registerWithoutVerification', (req, res, next) => {
  if (req.body) {
    const { username, email, password } = req.body;
    if (username && email && password) {
      User.findOne({ $or: [{ username }, { email }] }, (err, existingUser) => {
        if (err) { return next(err); }
        if (existingUser) {
          return res.redirect('/');
        } else {
          const newUser = new User({ username, email, password });
          newUser.save((err) => {
            if (!err) {
              req.session.username = newUser.username;
              req.session.email = newUser.email;
              return passportAuthenticate(req, res, next);
            } else {
              return res.redirect('/');
            }
          });
        }
      });
    } else {
      return res.redirect('/register');
    }
  }
});

// perform a logout of the user
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// simply send the auth status
router.get('/authstatus', (req, res) => {
  res.send(req.isAuthenticated());
});

export default router;
