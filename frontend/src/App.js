import React, { Component } from 'react'
import './App.css';
import Display from './Components/Display/Display';
import Form from './Components/Form/Form';
import Header from './Components/Header/Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import DisplaySingle from './Components/Display/DisplaySingle';

export class App extends Component {
  addMeme = (data) => {
    console.log(data);
  }
  getMemes = () => {
    const memes = [
      {
        id: '1',
        creator: 'Arun',
        caption: 'Corona Go',
        memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8uUG9ZOW9A0I8urub2RQtrROomj7dK8sIA&usqp=CAU'
      },
      {
        id: '2',
        creator: 'Aswin',
        caption: 'Hows it going here',
        memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2B-RnQm-8htF0znTzYMibAFRcpeAZRq6Bg&usqp=CAU'
      },
      {
        id: '3',
        creator: 'Arundhathi',  
        caption: 'Tall Building',
        memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28wDV5zk9bCkOe4bPVm_Vwb6J72h-UeP4-w&usqp=CAU'
      },
      {
        id: '4',
        creator: 'AGZ',
        caption: 'Hows it going here',
        memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR2B-RnQm-8htF0znTzYMibAFRcpeAZRq6Bg&usqp=CAU'
      },
      {
        id: '5',
        creator: 'Sneha',
        caption: 'Tall Building',
        memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR28wDV5zk9bCkOe4bPVm_Vwb6J72h-UeP4-w&usqp=CAU'
      }
    ]
    return memes;
  }
  getMeme = (id) => {
    const meme = {
      id: '1',
      creator: 'Arun',
      caption: 'Good meme',
      memeUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF8uUG9ZOW9A0I8urub2RQtrROomj7dK8sIA&usqp=CAU'
    }
    return meme;
  }
  render() {
    return (
      <Router>
        <div className="outer">
        <Header/>
        <Route exact path='/' render={props => (
          <div className="parent">
            <Display memes={this.getMemes()} getMeme={this.getMeme}/>
          </div>
        )} />
        <Route exact path='/addMeme' render={props => (
          <div className="parent">
            <Display memes={this.getMemes()} getMeme={this.getMeme}/>
            <Form addMeme={this.addMeme}/>
          </div>
        )} />
        <div className="parent">
          <Route exact path='/memes/:id' render={props => (
            <DisplaySingle meme={this.getMeme()}/>
          )} />
        </div>
      </div>
      </Router>
    )
  }
}

export default App
