import React from 'react'
import DisplayItem from './DisplayItem'
import PropTypes from 'prop-types';
import './Display.css'

//Maps through the memes and uses the component DisplayItem to render each of them
class Display extends React.Component{
    render(){
        return this.props.memes.map((meme) => 
            <DisplayItem key={meme.id} meme={meme}/>
        )
    }
}

Display.propTypes = {
    memes: PropTypes.array.isRequired
}

export default Display
