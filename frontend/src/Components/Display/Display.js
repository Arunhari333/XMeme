import React from 'react'
import DisplayItem from './DisplayItem'
import PropTypes from 'prop-types';
import './Display.css'

class Display extends React.Component{
    render(){
        return this.props.memes.map((meme) => 
            <DisplayItem key={meme.id} meme={meme} getMeme={this.props.getMeme}/>
        )
    }
}

Display.propTypes = {
    memes: PropTypes.array.isRequired,
    getMeme: PropTypes.func.isRequired
}

export default Display
