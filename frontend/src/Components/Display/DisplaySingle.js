import React, { Component } from 'react'
import './Display.css'

export class DisplaySingle extends Component {
    render() {
        const {creator, caption, memeUrl} = this.props.meme;
        return (
            <div className="card-single">
                <p id="creator">Created by {creator}</p>
                <p id="caption">{caption}</p>
                <img src={memeUrl} alt="Meme" id="image"></img>
            </div>
        )
    }
}

export default DisplaySingle

