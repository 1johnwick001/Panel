import React, { useState, ChangeEvent} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

interface Game {
  _id: number;
  gameName: string;
  gameType: string;
  gamePhoto: string;
}

const EditGame = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [gameName, setGameName] = useState('');
  const [gameType, setGameType] = useState('');
  const [gamePhoto, setGamePhoto] = useState<File | null>(null); // Set initial state to null;



  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setGamePhoto(file);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('gameName', gameName);
      formData.append('gameType', gameType);
      if (gamePhoto) {
        formData.append('gamePhoto', gamePhoto); // Append the file object, not just the file path
      }
  
      await axios.put(`http://localhost:8000/api/game/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/GamesList');
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  return (
    <>
    <Header/>
    <div className='d-flex justify-content-center p-1' style={{color:'black',backgroundColor:'#4fc9d1'}}>
                <h1>Edit Game</h1>
            </div>
      <div className="container">
        <div className="row justify-content-center p-3 ">
          <div className="col-lg-8">
            <div className=" ezy__contact8-form-card position-relative">
              <div className="card-body p-md-3">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="gameName" className="form-label">
                      Game Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="gameName"
                      required
                      value={gameName}
                      onChange={(event) => setGameName(event.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gameType" className="form-label">Game Type</label>
                    <select className="form-select" id="gameType" required value={gameType} onChange={(e) => {setGameType(e.target.value)}}>
                        <option value="" disabled selected >Select game type</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option> 
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="gamePhoto" className="form-label">
                      Game Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="gamePhoto"
                      name='gamePhoto'
                      accept='image/*'
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditGame;