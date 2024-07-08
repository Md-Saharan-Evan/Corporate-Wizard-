const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const { defaultImagePath } = require('../secret');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        maxlength: [100, 'User length overflow'],
        minlength: [3, 'User length not enough']
        
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
          validator: (v) => {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid email address!`
        },
      },
     password: {
        type: String,
        required: [true, 'User password is required'],
        minlength: [6, 'The length of user password can be minimum 6 characters'],
        set: (v) => bcrypt.hashSync(v,bcrypt.genSaltSync(10))
    },
     image: {
        type: String,
        default:
            defaultImagePath,
        
    },
     address: {
        type: String,
        required: [true, 'User address is required'],
    },
     phone: {
        type: String,
        required: [true, 'User phone is required'],
    },
     isAdmin: {
        type: Boolean,
        default: false
     },
     isBanned: {
        type: Boolean,
        default: false
     },
}, {timestamps: true});

const User = model('Users', userSchema);
module.exports = User;