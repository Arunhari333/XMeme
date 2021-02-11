import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <div className='header'>
                <h1>XMemes</h1>
            </div>
            <div className='layout'>
                <Link to='/addMeme' className="list"><div className='show-form'>Add Meme</div></Link>
            </div>
        </div>
    )
}

export default Header
