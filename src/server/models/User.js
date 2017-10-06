import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// used for encrypting passwords
const SALT_ROUNDS = 10;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String
  },
  picture: {
    type: Buffer
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(SALT_ROUNDS, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
          user.password = hash;
          next();
      });
  });
});

const User = mongoose.model('User', UserSchema);

User.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

User.getUserByUserName = (username, callback) => {
  const query = { username };
  User.findOne(query, callback);
};

User.getUserById = (id, callback) => {
  User.findById(id, callback);
};

User.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, function(err, isMatch) {
    if (err) {
      throw err
    }
    callback(null, isMatch);
  });
};

export default User;
