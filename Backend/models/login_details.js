const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    
    username: {
        type: String,
        required:[true,"Username is required"]
    },
    password: {
        type: String,
        required:[true,"Password is required"]
    },
    user_type: {
        type: String
    },
    // email: {
    //     type: String,
    //     reruired: [true, "Email is required"]
    // }
}, 
    {collection: "Login"}
);

module.exports = mongoose.model("Login", loginSchema);
