import express from "express"
import  { registerClient, loginClient, forgetPasswordOtp, passwordUpdate,otpVerify, getProfileList, logoutClient, deleteClient } from "../controller/clientController/client.controller.js";
import verifyToken from "../middleware/CheckSession.js";
import {betHistory, createBet} from "../controller/BetController/Bet.controller.js";
 

const router = express.Router();

//router for registering client
router.post("/api/registerClient",registerClient)
//for login
router.post("/api/loginClient",loginClient)
//sending otp on email
router.post("/api/forgetpasswordotp",verifyToken,forgetPasswordOtp)
//verification of otp
router.post("/api/verifyOtp",otpVerify)
//api for updating password
router.post("/api/passwordupdate",passwordUpdate)
//api for getting list
router.get("/api/profilelist",getProfileList)
//api for logging out client
router.post("/api/adminLogout",logoutClient)
//api for deleting client
router.delete("/api/deleteClient/:id",deleteClient)

//<!----------------Bet routing--------------!>
router.post("/api/createBet/:userId",createBet)
//api to gert betHistory based on gameType
router.get("/api/betHistory/:gameType",betHistory)



export default router;