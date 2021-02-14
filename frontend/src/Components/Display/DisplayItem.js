import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Display.css'
import { Link } from 'react-router-dom';

export class DisplayItem extends Component {
    render() {
        const {id, name, caption, url} = this.props.meme;
        return (
            <div className="card">
                {/* The card is linked to the page which displays an individual meme */}
                <Link to={{
                    pathname:`./memes/${id}`,
                    state: {
                        meme: this.props.meme
                    }
                }} className='list'>
                    <p className="name">Created by {name}</p>
                    <p className="caption">{caption}</p>
                    <img src={url} alt="Meme" id="image"></img>
                </Link>
            </div>
        )
    }
}

DisplayItem.propTypes = {
    meme: PropTypes.object.isRequired
}

export default DisplayItem
