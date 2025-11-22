import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import path from "path";


//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// 🏠 Update Address
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ automatically set by authMiddleware
    const { street, city, pincode } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { address: { street, city, pincode } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Address updated successfully",
      address: updatedUser.address,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating address" });
  }
};
export const getUserAddress = async (req, res) => {
  try {
    const { userId } = req.body; // authMiddleware injects this automatically

    const user = await userModel.findById(userId).select('address');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      address: user.address || {},
    });
  } catch (error) {
    console.error('Error fetching user address:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching address' });
  }
};
const updateProfileInfo = async (req, res) => {
  try {
    const { userId, name, email } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID missing" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { name, email } },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating profile info" });
  }
};
const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Incorrect old password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully ✅" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error updating password" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    // multer attaches file to req.file
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const userId = req.user?.id || req.body.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Not authorized" });

    const filename = req.file.filename;
    // URL path accessible via your static route: /images/<filename>
    const avatarUrl = `/uploads/${filename}`;

    const updated = await userModel.findByIdAndUpdate(
      userId,
      { $set: { avatar: avatarUrl } },
      { new: true }
    );

    res.json({ success: true, message: "Avatar uploaded", avatar: updated.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ matches your middleware
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { loginUser, registerUser, updateAddress , updateProfileInfo ,changePassword  };
