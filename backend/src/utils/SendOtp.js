import nodemailer from "nodemailer"
import randomsring from "randomstring"

// otp
const sendOTP = async(email) => {
    //generating otp
    const otp = randomsring.generate({
        length: 6,
        charset: "numeric"
    })
    

    //send otp to user's email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "john.wick00000456@gmail.com",
            pass: 'kpxu fhsa owqf gics'
        }
    })
    
    await transporter.sendMail({
        to: email,
        subject:" Your OTP to reset password",
        text: `Your otp is: ${otp} and its valid for next 5mins`
    })
    console.log(otp);
    return otp
}

export default sendOTP

