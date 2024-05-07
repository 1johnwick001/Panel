import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

interface People {
    _id: number;
    username: string;
    email: string;
    password:string;
}


function GamesList() {

    const [admins, setAdmins] = useState<People[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [adminPerPage] = useState(5);

    useEffect(() => {
        const fetchAdminList = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/getAdmin');
                const data = await response.json();
                setAdmins(data);
            } catch (error) {
                console.error('Error fetching admins list:', error);
            }
        };
        fetchAdminList();
    }, []);

    // Get current games
    const indexOfLastAdmin = currentPage * adminPerPage;
    const indexOfFirstAdmin = indexOfLastAdmin - adminPerPage;
    const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = async (id:number) => {
        try {
            console.log(id);
            
            await axios.delete(`http://localhost:8000/api/deleteAdmin/${id}`)
            //remove the deleted game from the state
            setAdmins(admins.filter(admin => admin._id !== id));
            console.log(admins);
            
        } catch (error) {
            console.error("Error deleteing game:",error);
        }
    }

    return (
        <>
            <Header/>
            <div className='d-flex justify-content-center p-1' style={{color:'black',backgroundColor:'#4fc9d1'}}>
                <h1>Admin's List</h1>
            </div>
        <div className="container position-static">
            <br />
            <table className="table table-striped table-bordered"style={{maxHeight:'300px'}}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Admin Name</th>
                        <th>Admin Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentAdmins.map((admin,index) => (
                        <tr key={admin._id}>
                            <td>{(currentPage - 1) * adminPerPage + index + 1}</td>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            
                            <td>
                                <Link to={`#`}className="btn btn-custom btn-md me-1 m-2" style={{color:'black', backgroundColor:'#4fc9d1'}}>
                                    Edit
                                </Link>
                                <button className="btn btn-danger btn-md"
                                onClick={() => handleDelete(admin._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul className="pagination  justify-content-end">
                {Array.from({ length: Math.ceil(admins.length / adminPerPage) }).map((_, index) => (
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
