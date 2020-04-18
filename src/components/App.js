import React, { Component } from "react";
import { connect } from 'react-redux'
import {fetchInitialData} from '../actions/shared'
import Game from './Game'
//import Login from './Login'

class App extends Component {
componentDidMount(){
    this.props.dispatch(fetchInitialData())
}


  render() {
    return <div className="App">
    {/* <Login /> */}
    <Game />
    </div>;
  }
}

export default connect()(App)
