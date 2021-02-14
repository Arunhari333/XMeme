import React, { Component } from 'react'
import './Display.css'
import { Link } from 'react-router-dom';

export class DisplaySingle extends Component {
    render() {
        console.log(this.props.meme);
        const {id, name, caption, url} = this.props.meme;
        return (
            <div className="single-outer">
                <div className="card-single">
                    <p className="name">Created by {name}</p>
                    <p className="caption">{caption}</p>
                    <img src={url} alt="Meme" id="image-single"></img>
                    <div className="btns">
                        <Link to={{
                            pathname:`./edit/${id}`,
                            state: {
                                meme: this.props.meme
                            }
                        }} className='list'>
                            <div id="edit">Edit</div>
                        </Link>
                        <div id="del" onClick={this.props.delMeme.bind(this, id)}>Delete</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplaySingle

