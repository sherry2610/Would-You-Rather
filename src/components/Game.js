import React,{Component} from 'react'
import {connect} from 'react-redux'
import AllQuestion from './AllQuestion'
import Login from './Login'
import loggedUser from '../actions/loggedUser'

class Green extends Component{
    state={
        value:'',
        componentToRender:'Login',
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(loggedUser(this.state.value))
        this.setState(()=>({
            componentToRender:'AllQuestion'
        }))
        //todo:redirect to game
        
    }
    handleChange = (e) => {
        e.persist()
        console.log("VALUE",e.target.name)
        this.setState(()=>({
            value:e.target.value
        }))
    }
    render(){
        return(
            <div>
            {this.state.componentToRender==='Login' && (<Login handleChange={this.handleChange} handleSubmit={this.handleSubmit} value={this.state.value} />)}
            {this.state.componentToRender==='AllQuestion' && (<AllQuestion currentUser={this.state.value} />)}
            </div>
        
        )
    }
}

export default connect()(Green)