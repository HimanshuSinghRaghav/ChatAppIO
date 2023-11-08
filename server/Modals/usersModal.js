import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import config from 'config'
const UsersSehema = mongoose.Schema(
    {
        name: {
            type: String,
            require:true
        },
        email:{
            type: String,
            require:true
        },
        phone:{
            type:String,
            require:true
        },
        gender:{
            type:String,
            require:true
        },
        date_of_birth:{
            type:String,
            require:true
        },
        address:{
            type:Object,
            require:true
        },
        profile_picture:{
            type:String
        }

    },
    {
        timestamps:true
    }
);

UsersSehema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id:this._id} , config.get("jwtPrivateKey"))
    return token
  }

const UserModel = mongoose.model("Users" , UsersSehema)
export default UserModel