import validateRegistration from "../utils/valiadation.js";
import bcrypt from "bcrypt"
import _ from 'lodash'
import Joi from 'joi'
import UserModel from "../Modals/usersModal.js";


const registerUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }

    const user = new UserModel(_.pick(req.body , ['name' , 'email' ,'password' , 'phone' , 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt)

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token' , token).send({
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error)
    return next(error)
  }
};

// login user
const loginUser = async (req, res) => {
  console.log("req")
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    console.log(user)
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    
    console.log(password , user.date_of_birth)
    if (password !== user.date_of_birth) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    console.log("true")
    const token = user.generateAuthToken();
    res.send({ success: true, user:{token , ...user._doc}});
  } catch (error) {
    console.log(error)
    return res.send(error);
  } 
};
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req);
};

export default registerUser;
export { loginUser };