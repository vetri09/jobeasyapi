const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Enter a username.'],
        validate: [validator.isAlphanumeric, 'usernames may only have letters and numbers.'],
        min:1,
        max:20
    },
    email:{
        type:String,
        required: [true, 'Enter an email address.'],
        unique: [true, 'This email address already exists.'],
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address.']
    },
    password:{
        type:String,
        required: [true, 'Enter a password.'],
        minLength: [6, 'Password should be at least six characters']
    },
    linkedIn:{
        type:String,
        default:""
    },
    github:{
        type:String,
        default:""
    },
    isRecruiter:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type:String,
        default:"https://i.ibb.co/r0PgzHc/noAvatar.png"
    }
},
{
    timestamps:true
},
{
    collection:'users'
});
//schema middleware to apply before saving
userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
      next();
});
// model creation
const userModel = mongoose.model('users',userSchema)
module.exports = userModel
