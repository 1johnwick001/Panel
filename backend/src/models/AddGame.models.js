import mongoose from "mongoose"


const AddGameSchema = new mongoose.Schema({
   
    gameName:{
        type:String,
        required:true
    },
    gamePhoto:{
        type:String,
        required:true
    },
    gameType:{
        type:String,
        required:true
    }
})

const AddGame = mongoose.model("AddGame",AddGameSchema);

export default AddGame;