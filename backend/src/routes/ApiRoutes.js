import express from "express"
import multer from "multer"
import path from "path"
import {AdminList, AdminListDelete, AdminLogin, AdminLogout, registerUser} from "../controller/User.controller.js"
import {uploadFile, getGameList, updateGame, deleteGame}  from "../controller/Upload.controller.js"


const router = express.Router()

const stoarge = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/photos")
    },filename:(req,file,cb)=>{
       cb(null, file.fieldname + "-" + Date.now() + path.extname (file.originalname))
    }
})


const upload = multer({
    storage:stoarge
})


router.post("/api/register",registerUser)
router.post("/api/login",AdminLogin)
router.post("/api/logout",AdminLogout)
router.delete("/api/deleteAdmin/:id",AdminListDelete);

router.get("/api/getAdmin",AdminList)

router.post('/api/upload',upload.single('gamePhoto'),uploadFile)
router.get('/api/gameList',getGameList)
router.put('/api/game/:id',upload.single("gamePhoto"),updateGame)
router.delete('/api/game/:id',deleteGame)

export default router