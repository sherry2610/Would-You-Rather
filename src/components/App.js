import React, { Component } from "react";
import { connect } from 'react-redux'
import {fetchInitialData} from '../actions/shared'
import Login from './Login'
import AllQuestion from './AllQuestion'
import Navbar from './Menu'
import Add from './Add'

class App extends Component {
  state = {
    componentToRender: 'Login'
  }
  toAllQuestion = () =>{
    this.setState(()=>({
      componentToRender: 'AllQuestion'
    }))
  }
  toAddQuestion = () =>{
    this.setState(()=>({
      componentToRender: 'AddQuestion'
    }))
  }
  toLeaderboard = () =>{
    this.setState(()=>({
      componentToRender: 'Leaderboard'
    }))
  }
  componentDidMount(){
    this.props.dispatch(fetchInitialData())
}




  render() {
    const {componentToRender} = this.state
    return (

    <div className="App">
    

      {componentToRender==='Login'&&(<Login manageView={this.toAllQuestion} /> )}
      {componentToRender==='AllQuestion'&&(
        <div>
      <Navbar toAllQuestion={this.toAllQuestion} toAddQuestion={this.toAddQuestion} />
      <AllQuestion />
      </div>
      )}
      {componentToRender==='AddQuestion'&&(
        <div>
      <Navbar toAllQuestion={this.toAllQuestion} toAddQuestion={this.toAddQuestion} />
      <Add toAllQuestion={this.toAllQuestion} />
      </div>
      )}
    
    
    </div>
    
    )
  }
}

export default connect()(App)
