import React, { Component } from "react";
import { connect } from 'react-redux'
import {fetchInitialData} from '../actions/shared'
import Login from './Login'
import AllQuestion from './AllQuestion'



class App extends Component {
  state = {
    componentToRender: 'Login'
  }
  toAllQuestion = () =>{
    this.setState(()=>({
      componentToRender: 'AllQuestion'
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
      {componentToRender==='AllQuestion'&&(<AllQuestion />)}
    
    
    
    </div>
    
    )
  }
}

export default connect()(App)
