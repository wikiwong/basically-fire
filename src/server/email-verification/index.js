import mongoose from 'mongoose';
import EmailVerification from 'email-verification';
import User from '../models/User';

const VERIFICATION_URL = 'http://localhost:8080/auth/verify/${URL}';

let emailVerification;

const configureEmailVerification = () => {
  if (emailVerification) {
    emailVerification.configure({
      expirationTime: 86400,
      verificationURL: VERIFICATION_URL,
      persistentUserModel: User,
      tempUserCollection: 'TempUsers',
      transportOptions: {
        service: 'Gmail',
        auth: {
          user: '', // fill in with your email address
          pass: ''  // password
        }
      },
      verifyMailOptions: {
        from: 'Do Not Reply <rmichael.wong@gmail.com>',
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
      }
    }, (err, options) => {
      if (err) {
        console.error(err);
        return;
      }
    });
    emailVerification.generateTempUserModel(User, (...args) => {});  
  }
  return emailVerification;
};

export const getEmailVerification = () => {
  if (emailVerification) {
    return emailVerification;
  }
  emailVerification = EmailVerification(mongoose);
  return configureEmailVerification();
};
