import React, { Component } from "react";
import { connect } from 'react-redux'
import {fetchInitialData} from '../actions/shared'
import Login from './Login'
import AllQuestion from './AllQuestion'
import Menu from './Menu'
import Add from './Add'
import Leaderboard from './Leaderboard'
import PollView from './PollView'
import Result from './Result'

class App extends Component {
  state = {
    componentToRender: 'Login',
    id:''
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
  toPollView = (qid) =>{
    this.setState(()=>({
      componentToRender: 'PollView',
      id:qid
    }))
  }
    toResultView = (qid) =>{
    this.setState(()=>({
      componentToRender: 'ResultView',
      id:qid,
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
      <Menu toAllQuestion={this.toAllQuestion} toAddQuestion={this.toAddQuestion} toLeaderboard={this.toLeaderboard} />
      <AllQuestion  toPollView={this.toPollView} />
      </div>
      )}
      {componentToRender==='AddQuestion'&&(
        <div>
      <Menu toAllQuestion={this.toAllQuestion} toLeaderboard={this.toLeaderboard} toAddQuestion={this.toAddQuestion} />
      <Add toAllQuestion={this.toAllQuestion} />
      </div>
      )}
      {componentToRender==='Leaderboard'&&(
        <div>
      <Menu toAllQuestion={this.toAllQuestion} toLeaderboard={this.toLeaderboard} toAddQuestion={this.toAddQuestion} />
      <Leaderboard toAllQuestion={this.toAllQuestion} />
      </div>
      )}
      {componentToRender==='PollView'&&(
        <div>
      <Menu toAllQuestion={this.toAllQuestion} toLeaderboard={this.toLeaderboard} toAddQuestion={this.toAddQuestion} />
      <PollView  id={this.state.id} toResultView={this.toResultView} />
      </div>
      )}
      {componentToRender==='ResultView'&&(
        <div>
      <Menu toAllQuestion={this.toAllQuestion} toLeaderboard={this.toLeaderboard} toAddQuestion={this.toAddQuestion} />
      <Result  id={this.state.id} />
      </div>
      )}
    </div>
    
    )
  }
}

export default connect()(App)
