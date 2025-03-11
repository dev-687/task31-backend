const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { setUser,getUser } = require("../services/auth");
/** User Registration */
exports.register = async (req, res) => {
  const saltRounds = 10;
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    /**check email is already exists or not. */
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(301).json({ message: "User already exists!" });
    }
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
  
    return res
      .status(201)
      .json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
/***User Login */
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); // Find user by email
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password); // compare passwords
  if (!isMatch) {
    return res.status(401).json({ message: "Wrong Password!" });
  }
  const token = setUser({
    id: user._id,
    username: user.username,
    email: user.email,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Login successful!", token });
  try {
  } catch (error) {}
};

/** User Auth */
exports.auth=async (req,res)=>{
  const token=req.cookies.token;
  console.log("token",token);
  
  if(!token) return res.status(401).json({message:"Unauthorized Access!"});
  try {
    const user=getUser(token);
    console.log(user);
    
    return res.status(201).json({message:"already LoggedIn",loggedIn:true,user});
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }

}

exports.allUser= async (req,res)=>{
  
  const users = await User.find();
  if (!users) {
    return res.status(401).json({ message: "No User Found." });
  }
  
 
  res.status(200).json({ message: "Login successful!", users });
  try {
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/** Logout the current user */
exports.logout= async (req,res)=>{
  res.clearCookie('token', { path: '/' });
  res.status(200).json({ message: "Logged out successfully" });
}
