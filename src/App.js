import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import App2 from './App2.js';

// Containers
import { DefaultLayout } from './containers';
//10.0.52.19:8000

// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
constructor(props){
  super(props);
  this.state={
    isLogged:false
  }
}

handleClick=()=>{
  this.setState({isLogged:true})
}
  render() {
    return (
     <div>
     
      {this.state.isLogged
       ?(<App2/>)
       :(<button onClick={() => this.handleClick()}> Login </button>)
      }
     </div>
    );
  }
}

export default App;
