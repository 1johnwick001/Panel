import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate()

    const AdminLogout = async () => {
        localStorage.removeItem("Admin_Email"); // Remove stored email
        localStorage.removeItem("is_Admin_loggedIn"); // Clear session status
        navigate("/"); // Redirect to the home page or login page
    };



    return (
        <nav className="navbar" style={{ backgroundColor: "#4fc9d1",width:"1920px" }}>
            <div className="container-fluid d-flex" style={{width:'1920px'}} >

                <div className="navbar" id="navbarNav">
                    <div className="d-flex justify-content-space-around p-2">
                        <Button
                            variant="contained"
                            color="inherit"
                            className='ms-auto'
                            startIcon={<LogoutIcon />}
                            onClick={() => {
                                navigate('/AdminHome')
                            }}>
                            Home
                        </Button>
                    
                   
                        <Button
                            variant="contained"
                            color="inherit"
                            className='mx-3'
                            startIcon={<LogoutIcon />}
                            onClick={() => {
                                AdminLogout()
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header