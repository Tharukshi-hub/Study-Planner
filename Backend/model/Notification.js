const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        default:"info"
    },

    read:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Notification",
    NotificationSchema
);