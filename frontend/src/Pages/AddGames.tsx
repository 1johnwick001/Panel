import axios from 'axios';
import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import API_BASE_URL from '../config/Config';

function AddGames() {
  const [gameName, setGameName] = useState("");
  const [gamePhoto, setGamePhoto] = useState<File | null>(null); // Set initial state to null

  const navigate = useNavigate()

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setGamePhoto(file)
    }
  }
  const [gameType, setGameType] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      const formData = new FormData();
      formData.append('gameName', gameName);
      if (gamePhoto) {
        formData.append('gamePhoto', gamePhoto);
      }
      formData.append('gameType', gameType);

      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('form data sent successfully:', response.data);
      //clearing form fields after successfully sending data
      setGameName("")
      setGamePhoto(null)
      setGameType("")

      // Navigate to the game list page upon successful submission
      navigate('/GamesList');
    } catch (error) {
      console.log('error while submiting data through API', error);

    }
  }
  return (
    <>
      <Header/>
      <div className='d-flex justify-content-center p-1' style={{color:'black',backgroundColor:'#4fc9d1'}}>
        <h1>Add New Game</h1>
      </div>
    <div className="container">
      <div className="row justify-content-center p-3 ">
        <div className="col-lg-8">
          <div className=" ezy__contact8-form-card position-relative">
            <div className="card-body p-md-3">
              <form id="addGameForm" className="mx-auto mt-5" onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="mb-3">
                  <label htmlFor="gameName" className="form-label">Game Name</label>
                  <input type="text" className="form-control" id="gameName" required value={gameName} onChange={(e) => { setGameName(e.target.value) }} />
                </div>
                <div className="mb-3">
                  <label htmlFor="gamePhoto" className="form-label">Game Photo</label>
                  <input type="file" name='gamePhoto' className="form-control" id="gamePhoto" required accept='image/*' onChange={handleChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="gameType" className="form-label">Game Type</label>
                  <select className="form-select" id="gameType" required value={gameType} onChange={(e) => { setGameType(e.target.value) }}>
                    <option value="" disabled selected >Select game type</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="RPG">RPG</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>
                <div className='text-center'>
                <button type="submit" className="btn btn-custom btn-lg"style={{color:'#ffff',backgroundColor:"#4fc9d1"}}>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddGames