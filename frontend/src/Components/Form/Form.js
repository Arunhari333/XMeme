import React, { Component } from 'react'
import './Form.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            caption: '',
            url: '',
            errors: {
                name: '',
                caption: '',
                url: ''
            }
        }
    }
    getStyle = () => {
        return{
            marginTop: '10px',
        }
    }
    validate = () => {
        const {name, caption, url} = this.state;
        const errors = this.state.errors;
        const regex = RegExp('(http|https)://');
        errors.name = (name === '') ? 'Name field cannot be empty' : '';
        errors.caption = (caption === '') ? 'Caption field cannot be empty' : '';
        if(url === ''){
            errors.url = 'Meme URL field cannot be empty';
        }
        else if(!regex.test(url)){
            errors.url = 'Invalid URL';
        }
        else{
            errors.url = '';
        }
        this.setState({errors: errors})
        if(errors.name === '' && errors.caption === '' && errors.url === ''){
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
            const {errors, response, ...data} = this.state;
            this.props.addMeme(data);
            this.setState({name: '', caption: '', url: ''});
        }
    }
    render() {
        return (
                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <span className='close-btn'><Link to='/' style={{textDecoration: 'none'}}>x</Link></span>
                        <h1>Add a Meme</h1>
                        <div className='form-inputs'>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" 
                                className='form-input' value={this.state.name} onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.name}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="caption" className="form-label">Caption</label>
                            <input type="text" id="caption" name="caption" placeholder="Enter the caption" 
                                className='form-input' value={this.state.caption} onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.caption}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="url" className="form-label">Meme URL</label>
                            <input type="text" id="url" name="url" placeholder="Enter the URL of the meme image" 
                                className='form-input' value={this.state.url} onChange={this.handleChange}/>
                            <p className="err">{this.state.errors.url}</p>
                        </div>
                        <button type="submit" className="form-input-btn">Post Meme</button>
                        <p className="err" style={this.getStyle()}>{this.props.response}</p>
                    </form>
                </div>
        )
    }
}

Form.propTypes = {
    response: PropTypes.string.isRequired,
    addMeme: PropTypes.func.isRequired
}


export default Form
