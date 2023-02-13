import React from 'react'
import BrandLogo from './BrandLogo'
import Searchbar from './Searchbar'

const Navbar = () => {
    return (
        <nav className="navbar">
            <BrandLogo />
            <Searchbar />
        </nav>
    )
}

export default Navbar