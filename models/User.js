const mongoose = require('mongoose');
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
      },
      name: {
        type: String,
        required: true
      },
      avatarUrl: {
        type: String,
        required: true
      },
});

const User = mongoose.model('User', userSchema);