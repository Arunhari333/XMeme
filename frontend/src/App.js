import React, { Component } from 'react'
import './App.css';
import Display from './Components/Display/Display';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DisplaySingle from './Components/Display/DisplaySingle';
import EditForm from './Components/Form/EditForm';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      memes: [],
      activeItem: {
        name: '',
        caption: '',
        url: '',
      },
      response: ''
    }
    this.getMemes = this.getMemes.bind(this)
  }

  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  UNSAFE_componentWillMount(){
    this.getMemes();
  }

  getMemes = () => {
    console.log('Fetching...')
    let url = 'https://arunhari.pythonanywhere.com/api/memes';
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({
      memes: data
    }))
    .catch(() => console.log("Can’t access " + url + " response."))
  }

  getMeme = (meme) => {
    return meme;
  }

  addMeme = (data) => {
    this.setState({ activeItem: data },
      () => {
        let csrftoken = this.getCookie('csrftoken');
        let url = 'https://arunhari.pythonanywhere.com/api/memes';
        fetch(url, {
          'method': 'POST',
          'headers': {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          'body': JSON.stringify(this.state.activeItem)
        }).then(response => response.json())
          .then(data => {
            this.getMemes();
            if(!data.id){
              this.setState({response: 'Duplicate memes are not allowed'});
            }
            else if(this.state.response !== ''){
              this.setState({response: ''});
            }
            this.setState({
              activeItem: {
                name: '',
                caption: '',
                url: '',
              }
          })
        }).catch(err => console.log('ERROR: ', err))
      }
    );
  }

  editMeme = (data, id) => {
    this.setState({ activeItem: data },
      () => {
        let csrftoken = this.getCookie('csrftoken');
        let url = `https://arunhari.pythonanywhere.com/api/memes/edit/${id}`;
        fetch(url, {
          'method': 'PATCH',
          'headers': {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          'body': JSON.stringify(this.state.activeItem)
        }).then(response => response.json())
          .then(response => {
            this.getMemes();
            this.setState({
              activeItem: {
                name: '',
                caption: '',
                url: '',
              }
            });
            window.location.replace('/');
        }).catch(err => console.log('ERROR: ', err))
      }
    );
  }

  delMeme = (id) => {
    console.log('Deleting Item', id)
    let csrftoken = this.getCookie('csrftoken');
    let url = `https://arunhari.pythonanywhere.com/api/memes/delete/${id}`;
    fetch(url, {
      'method': 'DELETE',
      'headers': {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then(response => response.json())
      .then(response => {
        this.getMemes();
        window.location.replace('/');
    }).catch(err => console.log('ERROR: ', err))
  }

  render() {
    return (
      <Router>
        <div className="outer">
        <Header/>
        <Route exact path='/' render={props => (
          <div className="parent">
            <Display memes={this.state.memes} getMeme={this.getMeme}/>
          </div>
        )} />
        <Route exact path='/addMeme' render={props => (
          <div className="parent">
            <Display memes={this.state.memes} getMeme={this.getMeme}/>
            <Form addMeme={this.addMeme} response={this.state.response}/>
          </div>
        )} />
        <div className="parent">
          <Route exact path='/memes/:id' render={props => (
            <DisplaySingle meme={props.location.state.meme} delMeme={this.delMeme}/>
          )} />
        </div>
        <div className="parent">
          <Route exact path='/memes/edit/:id' render={props => (
            <React.Fragment>
              <DisplaySingle meme={props.location.state.meme} delMeme={this.delMeme}/>
              <EditForm meme={props.location.state.meme} editMeme={this.editMeme}/>
            </React.Fragment>
          )} />
        </div>
      </div>
      </Router>
    )
  }
}

export default App
