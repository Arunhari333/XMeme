import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Display.css'
import { Link } from 'react-router-dom';

export class DisplayItem extends Component {
    render() {
        const {id, creator, caption, memeUrl} = this.props.meme;
        return (
            <div className="card">
                <Link to={`/memes/${id}`} query={{meme: this.props.getMeme.bind(this, id)}} className='list'>
                    <p id="creator">Created by {creator}</p>
                    <p id="caption">{caption}</p>
                    <img src={memeUrl} alt="Meme" id="image"></img>
                </Link>
            </div>
        )
    }
}

DisplayItem.propTypes = {
    meme: PropTypes.object.isRequired
}

export default DisplayItem
