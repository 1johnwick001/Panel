import AddGame from "../models/AddGame.models.js"

import path from "path"

const uploadFile = async (req, res) => {
    try {
      const { gameName, gameType } = req.body;
  
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const gamePhoto = req.file.filename;

      // Construct the path to the uploaded file
      const gamePhotoPath = path.join(req.file.filename);
  
      const GameData = new AddGame({
        gameName,
        gameType,
        gamePhoto:gamePhotoPath,
      });

      const savedGame = await GameData.save(); 
    

      return res.status(200).json({ message: 'File uploaded and game data saved successfully', filename: gamePhoto.filename });
    } catch (error) {
      // Handle any errors that occur during file upload
      console.error(error);
      return res.status(500).json({ message: 'Error uploading file' });
    }
};

const getGameList = async (req,res) => {
try {
    const gameList = await AddGame.find();
    res.status(200).json(gameList)
} catch (error) {
    console.error('Error fetching userLIst',error);
    res.status(500).json({message:"Internal Server Error"})
}
}

const updateGame = async (req,res) => {
    try {
        const {id} = req.params;
        const {gameName,gameType} = req.body;

        // Check if a new file is uploaded
        if (req.file) {
          // Handle new file upload
          const gamePhoto = req.file.filename;
          // Update game with new image
          await AddGame.findByIdAndUpdate(id, { gameName, gameType, gamePhoto });
      } else {
          // No new file uploaded, keep the existing image
          // Update game without modifying the image field
          await AddGame.findByIdAndUpdate(id, { gameName, gameType });
      }

      res.status(200).json({ message: 'Game List updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

const deleteGame = async (req,res) => {
  const gameId = req.params.id;

  try {
    //find the game by its id and remove it from the database
    await AddGame.findByIdAndDelete(gameId);
    res.status(200).json({message:"Game Deleted Successfully"})
  } catch (error) {
    console.error('Error deleing game:',error);
    res.status(500).json({message:"Internal Server Error"})
  }
}

export { uploadFile, getGameList, updateGame,deleteGame}