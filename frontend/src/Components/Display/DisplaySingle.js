import React, { Component } from 'react'
import './Display.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class DisplaySingle extends Component {
    render() {
        const {id, name, caption, url} = this.props.meme;
        return (
            <div className="single-outer">
                <div className="card-single">
                    <p className="name">Created by {name}</p>
                    <p className="caption">{caption}</p>
                    <img src={url} alt="Meme" id="image-single"></img>
                    <div className="btns">
                        {/* This button takes user to the edit form */}
                        <Link to={{
                            pathname:`./edit/${id}`,
                            state: {
                                meme: this.props.meme
                            }
                        }} className='list'>
                            <div id="edit">Edit</div>
                        </Link>
                        {/* This button deletes the meme */}
                        <div id="del" onClick={this.props.delMeme.bind(this, id)}>Delete</div>
                    </div>
                </div>
            </div>
        )
    }
}

DisplaySingle.propTypes = {
    meme: PropTypes.object.isRequired,
    delMeme: PropTypes.func.isRequired
}

export default DisplaySingle

