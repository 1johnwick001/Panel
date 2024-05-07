import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface Game {
    _id: number;
    gameName: string;
    gameType: string;
    gamePhoto: string;
}


function GamesList() {

    const [games, setGames] = useState<Game[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(5);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/gameList');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        fetchGames();
    }, []);

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = async (id:number) => {
        try {
            await axios.delete(`http://localhost:8000/api/game/${id}`)
            //remove the deleted game from the state
            setGames(games.filter(game => game._id !== id));
        } catch (error) {
            console.error("Error deleteing game:",error);
        }
    }

    return (
        <>
            <Header/>
            <div className='d-flex justify-content-center p-1' style={{color:'black',backgroundColor:'#4fc9d1'}}>
                <h1>Games List</h1>
            </div>
        <div className="container">
           
            
            <br />
           
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Game Name</th>
                        <th>Game Type</th>
                        <th>Game Photo</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentGames.map((game,index) => (
                        <tr key={game._id}>
                            <td>{(currentPage - 1) * gamesPerPage + index + 1}</td>
                            <td>{game.gameName}</td>
                            <td>{game.gameType}</td>
                            <td>
                            <img src={`http://localhost:8000/photos/${game.gamePhoto}`} alt={game.gameName} style={{ display:'block',margin:'auto',maxWidth: '100px', maxHeight: '90px', borderRadius:'55px' }} />
                            </td>
                            <td>
                                <Link to={`/edit/${game._id}`}className="btn btn-custom btn-md me-1 m-2"style={{color:'black', backgroundColor:'#4fc9d1'}}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger btn-md" onClick={() => handleDelete(game._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination justify-content-end">
                {Array.from({ length: Math.ceil(games.length / gamesPerPage) }).map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <br/>
                        <button onClick={() => paginate(index + 1)} className="page-link" style={{backgroundColor:'#4fc9d1',}}>
                            {index + 1}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default GamesList;
