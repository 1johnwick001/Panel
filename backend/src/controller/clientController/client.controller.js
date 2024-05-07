import Client from "../../models/Customer.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import sendOTP from "../../utils/SendOtp.js";

const saltRounds = 10

//controller for registering client
const registerClient = async (req, res) => {
    try {

        const { username,
            email,
            phoneNumber,
            countryCode,
            password,
            conf_password } = req.body

        //hashing password using bcrypt
        const hashPassword = await bcrypt.hash(password, saltRounds);

        //create new client instance
        const newClient = new Client({
            username,
            email,
            phoneNumber,
            countryCode,
            password: hashPassword, //store the hashed password 
            conf_password: hashPassword //store the hashed password
        })

        //if email alredy exists than:
        const existingEmail = await Client.findOne({ email })

        if (existingEmail) {
            return res.status(209).json({
                message: "Email alraedy registered"
            })
        }
        else if (password !== conf_password) {
            return res.status(209).json({
                message: "Password and confirm password do not match!!!!"
            })
        }

        const mobileLength = countryCode.toString().length + phoneNumber.toString().length;

        if (mobileLength < 10 || mobileLength > 13) {
            return res.status(209).json({ message: "mobile number must be valid" })
        }

        else if (password.length < 6 && conf_password.length < 6) {
            return res.status(209).json({
                message: "Password and confirm password should a least be 6 characters long"
            })
        }

        //save the new client in DB
        await newClient.save()
        const data = newClient

        return res.status(201).json({
            code:201,
            status:true,
            message: "Client registered successfully",
            data 
            
        })

    } catch (error) {
        console.error("Error registering client: ", error);
        return res.satus(500).json({
            message: "Error while regisering client"
        })
    }
}

const loginClient = async (req, res) => {
    try {

        const { email, password } = req.body;

        //find client by id
        const client = await Client.findOne({ email })

        if (!client) {
            return res.status(404).json({
                message: "Client with he provided email was not found"
            })

        }

        //compare password with the db one
        const matchPassword = await bcrypt.compare(password, client.password)

        if (!matchPassword) {
            return res.status(404).json({
                message: "Password did not match,YO!!!"
            })
        }

        const payload = {
            clientId: client._id,
            email: client.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
        console.log(token);
        //save client in db
        await client.save();


        return res.status(200).json({
            message: "Client logggedIn Successfully",
            token //GENERATED JWT TOKEN
        })

    } catch (error) {
        console.error("error while logging client:", error);
        return res.status(500).json({
            message: "server side issue while logging client"
        })
    }
}

const forgetPasswordOtp = async (req, res) => {
    try {
        
        const { email } = req.body;

        //generate otp
        const forgetPassOtp = await sendOTP(email);
        // Update the user's document with the OTP
        const client = await Client.findOneAndUpdate({ email }, {
            $set: {
                forgetPassOtp
            }
        }, { new: true });

        console.log("client", client);

        if (!client) {
            return res.status(404).json({
                message: "User email not found"
            })
        }

        return res.status(201).json({
            message: "OTP sent successfully on users email",
            data: {

                forgetPassOtp
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "server side error while sending OTP"
        })
    }
}

const otpVerify = async (req, res) => {
    try {
        const { email, otp } = req.body;

        //find the client by email and retrieve the stored otp
        const client = await Client.findOne({ email })
        if (!client) {
            return res.status(404).json({ message: "user not found" })
        }

        const storedOTP = client.forgetPassOtp;


        //check if the otp matches and its valid
        if (otp === storedOTP) {

            client.forgetPassOtp = undefined;

            await client.save();

            return res.status(200).json({ message: "OTP verified successfully" })
        } else {
            return res.status(401).json({
                message: "Invalid OTP"
            })
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return res.status(500).json({ message: "Server error while verifying OTP" })
    }

}

const passwordUpdate = async (req, res) => {
    try {

        const { email, password, conf_password } = req.body;

        const client = await Client.findOneAndUpdate({ email }, { password, conf_password }, { new: true });

        if (!client) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        if (password !== conf_password) {
            return res.status(209).json({
                message: "Passwor do not match"
            })
        }

        //Hash the new password
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        //update the user's password
        client.password = hashedPassword;

        //save the updated user in db
        await client.save();
        return res.status(201).json({
            message: "Password reset successfully",
            data: client.password
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server side error while verifying otp"
        })
    }
}

const getProfileList = async (req, res) => {
    try {

        const profiles = await Client.find().select('username email password countryCode phoneNumber');

        //Format phoneNumber to include country code in number ex:- (+91 1234567891)
        const formattedProfiles = profiles.map(profile => ({
        username : profile.username,
        email: profile.email,
        password: profile.password,
        phoneNumber: `${profile.countryCode} ${profile.phoneNumber}`
        }))

        return res.status(200).json(formattedProfiles)

    } catch (error) {
        console.error("error while getting profiles of client: ", error);
        return res.satus(400).json({
            message: "Server side error while geting profile for client"
        })
    }
}

const logoutClient = async (req,res) => {
    try {
        //no user data is needed from request body cz of stateless login(JWT)
        return res.status(200).json({message:"Client logged out successfully"})
    } catch (error) {
        console.error("error while logging out user",error);
        return res.status(500).json({message:"server side issue while logging out "})
    }
}

const deleteClient = async (req,res) => {
    const clientId = req.params.id;

    try {
        
        await Client.findByIdAndDelete(clientId);

        res.status(200).json({
            code:200,
            status:true,
            message:"Client deleted successfully"
        })


    } catch (error) {
        console.error("error deleting client",error);
        res.status(500).json({
            message:"Internal server error while deleting client"
        })
    }
}


export {
    registerClient,
    loginClient,
    forgetPasswordOtp,
    otpVerify,
    passwordUpdate,
    getProfileList,
    logoutClient,
    deleteClient
}