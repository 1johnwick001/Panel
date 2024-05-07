import User from "../models/User.models.js";
import bcrypt from "bcrypt"

const saltRounds = 10

//controller for registering user
const registerUser = async (req,res) => {
    try {
     // Extract username, email, and password from the request body
    const {username , email, password} = req.body
    console.log("email: ",email);

    // Hashing  password using bcrypt
    const hashPassword = await bcrypt.hash(password,saltRounds);

    //create new user instance 
    const newUser = new User({
        username,
        email,
        password:hashPassword
    })

    // Check if the email or username already exists in the database
    const existingUser = await User.findOne({
        $or: [{username},{email}]
    })

    // If a user with the same email or username already exists, return an error response
    if (existingUser) {
        return res.status(209).json({
            status:209,
            message:"USERNAME OR EMAIL ALREADY EXISTS!!!!"
        })
    }

    else if (password.length < 8 ) {
        return res.status(209).json({
            code:209,
            status:false,
            message:"password must be a least 8 character long",
            data:{}

        })
    }

     // Save the user to the database
    await newUser.save();

    const data = newUser

    //return success response with user data
    return res.status(201).json({
        code:201,
        status:true,
        message:"Admin Sucessfully created",
        data
        
    })
    
} catch(error){
    // Return error response if an error occurs during user creation
    console.error("Error creating User:",error);
    return res.status(500).json({
        status:500,
        message:"Error while registering user into db"
    })
}
}

const AdminLogin = async (req,res) => {
    try {
        const {email, password} = req.body;

        console.log("email: ",email);

        //find user by email
        const Admin = await User.findOne({
            email
        });

        if (!Admin) {
            return res.status(404).json({
                status:404,
                message:"Admin with the provided email was not found"
            })
        }

        const MatchedPassword = await bcrypt.compare(password,Admin.password)

        if (!MatchedPassword) {
            return res.status(404).json({
                status: 404,
                message: "In Correct Password"
            })
        }
        Admin.is_Admin_loggedIn = true;

        //save the user in db
        await Admin.save();

        //generate a jwt token
        // const token = jwt.sign({id:Admin._id},process.env.JWT_SECRET,{
        //     expiresIn:"1h"
        // })

        // set the token in the user's cookie
    // res.cookie("token", token, { httpOnly: true });

        return res.status(201).json({
            status:201,
            message:"Admin loggedIn successfully",
            data:Admin   
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status:500,
            message:"Server Side Error while logging in Admin"
        })
    }
}

const AdminLogout = async(req,res) => {
    try {
        const {email} = req.body

        //find the admin bu email
        const admin = await User.findOne({email})

        if (!admin) {
            return res.status(404).json({
                status: 404,
                message: "Admin not found"
            });
        }

        // Update the is_Admin_loggedIn status to false
        admin.is_Admin_loggedIn = false;

        await admin.save()
        return res.status(202).json({
            status:202,
            message:"Admin loggedOut Sucessfully",
            is_Admin_loggedIn:admin.is_Admin_loggedIn
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Server Side error Admin Logout"
        })
    }
}

const AdminList = async (req,res) => {
    try {

        const list = await User.find().select('username email password')

        return res.status(200).json(list)
        
    } catch (error) {
        console.error("error while geting admins list",error);
        return res.status(400).json({
            message:"Server side error while getting profile for client"
        })
    }
}

const AdminListDelete = async (req,res) => {
    const adminId = req.params.id;

    try {
        //find the admin by its id and remove it from the list in real it will be removed from db
        
        await User.findByIdAndDelete(adminId);

        res.status(200).json({message:"Admin Deleted from list successfully!!"})
        
    } catch (error) {
        console.error("error deleting Admin from list",error);
        res.status(500).json({message:"Internal Server Error while deleting Admin from list"})
    }

}

export {
    registerUser,
    AdminLogin,
    AdminLogout,
    AdminList,
    AdminListDelete
}