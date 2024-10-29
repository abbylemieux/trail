import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom'
import '/src/Styles/Nav.css'




const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="navbar">
                <Link to="/" className='navbar-logo'>TrailTrekker.io</Link>

                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    
                    <Link className='navlink1' to="/log-in">Log in</Link>
                    <Link className='navlink1' to="/for-you">For You</Link>
                    <Link className='navlink1' to="/">Near You</Link>
                    <Link className='navlink1' to="/your-trails">Your Trails</Link>
                    <Link className='navlink2' to="/sign-up">Sign up</Link>
                </div>

                <div className='navbar-toggle' onClick={toggleMenu}>
                    <span className='toggle-bar'></span>
                    <span className='toggle-bar'></span>
                    <span className='toggle-bar'></span>
                </div>
            </nav>
            <Outlet />
            
        </>
    );
};

export default Navbar;
