import mongoose from "mongoose";

const userSchema2 = new mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true
   },
   name: {
    type: String,
    required: true
   },
   age:{
     type: Number,
     required: true
   }
});

const Newusers = new mongoose.model("Newusers", userSchema2);

export default User;