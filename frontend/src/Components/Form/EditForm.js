import React, { Component } from 'react'
import './Form.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export class EditForm extends Component {

    //Initaializes the state with the data of the selected meme
    constructor(props){
        super(props);
        const {name, caption, url} = this.props.meme;
        this.state = {
            name: name,
            caption: caption,
            url: url,
            errors: {
                name: '',
                caption: '',
                url: ''
            }
        }
    }

    //This function validates the inputs submitted by the user
    validate = () => {
        const {name, caption, url} = this.state;
        const errors = this.state.errors;
        const regex = RegExp('(http|https)://');
        //Displays error if any of the input fields are empty
        errors.name = (name === '') ? 'Name field cannot be empty' : '';
        errors.caption = (caption === '') ? 'Caption field cannot be empty' : '';
        if(url === ''){
            errors.url = 'Meme URL field cannot be empty';
        }
        //Displays error if the meme URL is invalid
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

    //Sets the state when the user changes the input value
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //Handles form submission
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validate()){
            const {errors, ...data} = this.state;
            const {name, ...lastTwo} = data;
            this.props.editMeme(lastTwo, this.props.meme.id);
        }
    }

    //Displays the labels, inputs and errors
    render() {
        const {id} = this.props.meme;
        return (
                <div>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <span className='close-btn'><Link to={{
                            pathname:`../${id}`,
                            state: {
                                meme: this.props.meme
                            }
                        }} style={{textDecoration: 'none'}}>x</Link></span>
                        <h1>Edit Meme</h1>
                        <div className='form-inputs'>
                            <label htmlFor="name" className="form-label">Name (Non-editable)</label>
                            {/* Made the field non-editable as name should not be edited */}
                            <input type="text" id="name" name="name" placeholder="Enter your name" 
                                className='form-input' onChange={this.handleChange} value={this.state.name} readOnly/>
                            <p className="err">{this.state.errors.name}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="caption" className="form-label">Caption</label>
                            <input type="text" id="caption" name="caption" placeholder="Enter the caption" 
                                className='form-input' onChange={this.handleChange} value={this.state.caption}/>
                            <p className="err">{this.state.errors.caption}</p>
                        </div>
                        <div className='form-inputs'>
                            <label htmlFor="url" className="form-label">Meme URL</label>
                            <input type="text" id="url" name="url" placeholder="Enter the URL of the meme image" 
                                className='form-input' onChange={this.handleChange} value={this.state.url}/>
                            <p className="err">{this.state.errors.url}</p>
                        </div>
                        <button type="submit" className="form-input-btn">Edit Meme</button>
                    </form>
                </div>
        )
    }
}

EditForm.propTypes = {
    meme: PropTypes.object.isRequired,
    editMeme: PropTypes.func.isRequired
}

export default EditForm
