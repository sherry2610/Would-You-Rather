import React, { Component } from "react";
import { connect } from 'react-redux'
import {fetchInitialData} from '../actions/shared'


class App extends Component {
componentDidMount(){
  this.props.dispatch(fetchInitialData())
  console.log(this.props)
}


  render() {
    return <div className="App">would you rather</div>;
  }
}

export default connect()(App)
