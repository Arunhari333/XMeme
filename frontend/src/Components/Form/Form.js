import React, { Component } from 'react'
import './Form.css';
import { Link } from "react-router-dom";

export class Form extends Component {
    state = {
        creator: '',
        caption: '',
        memeUrl: '',
        errors: {
            creator: '',
            caption: '',
            memeUrl: ''
        }
    }
    validate = () => {
        const {creator, caption, memeUrl} = this.state;
        console.log(creator, caption, memeUrl);
        const errors = this.state.errors;
        // const regex = RegExp([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&/\/=]*));
        errors.creator = (creator === '') ? 'Creator field cannot be empty' : '';
        errors.caption = (caption === '') ? 'Caption field cannot be empty' : '';
        errors.memeUrl = (memeUrl === '') ? 'Meme URL field cannot be empty' : '';
        // else if(!regex.test(memeUrl)){
        //     errors.memeUrl = 'Invalid URL';
        // }
        this.setState({errors: errors})
        if(errors.creator === '' && errors.caption === '' && errors.memeUrl === ''){
            return true;
        }
        return false;
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validate()){
            const {errors, ...data} = this.state;
            this.props.addMeme(data);
        }
    }
    render() {
        return (
                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <span className='close-btn'><Link to='/' style={{textDecoration: 'none'}}>x</Link></span>
                        <h1>Add a Meme</h1>
                        <div className='form-inputs'>
                            <label htmlFor="creator" className="form-label">Creator</label>
                            <input type="text" id="creator" name="creator" placeholder="Enter your name" 
                                className='form-input' onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.creator}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="caption" className="form-label">Caption</label>
                            <input type="text" id="caption" name="caption" placeholder="Enter the caption" 
                                className='form-input' onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.caption}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="memeUrl" className="form-label">Meme URL</label>
                            <input type="text" id="memeUrl" name="memeUrl" placeholder="Enter the URL of the meme image" 
                                className='form-input' onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.memeUrl}</p>
                        </div>
                        <button type="submit" className="form-input-btn">Post Meme</button>
                    </form>
                </div>
        )
    }
}

export default Form
