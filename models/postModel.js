const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required: [true, 'User Id required.'],
    },
    jobtitle:{
        type:String,
        required: [true, 'Enter Job Title.'],
        max:25
    },
    company:{
        type:String,
        required: [true, 'Enter company name.'],
        max:230
    },
    location:{
        type:String,
        required: [true, 'Enter Job location.'],
        max:20
    },
    jobdescription:{
        type:String,
        required: [true, 'Enter Job description.'],
    },
    applicants:{
        type:Array,
        default:[]
    }
},
{
    timestamps:true
},
{
    collection:'posts'
});
// model creation
const postModel = mongoose.model('posts',postSchema)
module.exports = postModel
