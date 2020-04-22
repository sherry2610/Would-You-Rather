import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { handleAddAnswer } from "../actions/questions";
import {withRouter} from 'react-router-dom'


class PollView extends Component {
    state = {
        value:''
    }
    handleChange = (e) => {
        e.persist()
        this.setState(()=>({
            value:e.target.value
        }))
    }
  handleSubmitAnswer = (e) => {
      const {dispatch,currentUserId,id} = this.props
      const {value} = this.state
    e.preventDefault();
    dispatch(handleAddAnswer(currentUserId[0],id,value))
  this.props.history.push(`/home`)
  this.props.history.push(`question/${id}`)
  
  }
  render() {
    
    const {askedBy,pic,optionOneText,optionTwoText} = this.props
    return (
        <div className='pollview-card'>
        
      <Form onSubmit={(e)=>{this.handleSubmitAnswer(e)}}>
      <h6>{askedBy} asking Would you rather...</h6>
      <Image src={pic} alt="profile pic" className='pollview-img' roundedCircle/>
        <div className='option'>
        <Form.Check inline type="radio" name="option" value="optionOne" onChange={(e)=>this.handleChange(e)} />{optionOneText}<br />
        <Form.Check inline type="radio" name="option" value="optionTwo" onChange={(e)=>this.handleChange(e)} />{optionTwoText}
        <Button variant="primary" disabled={this.state.value?false:true} type="submit" className='pollview-btn'>
          Submit
        </Button>
        </div>
        
      </Form>
      </div>
    );
  }
}

function mapStateToProp({ users,questions, loggedUser },props) {
    const {id} = props.match.params
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join("");
  const currentUserId = uid.filter((uid) => {return (users[uid].name === currentUser) ? users[uid].answers : '' })
  
  const pic = users[questions[id].author].avatarURL
  const optionOneText = questions[id].optionOne.text
  const optionTwoText = questions[id].optionTwo.text
  const askedBy = users[questions[id].author].name

  return {
    currentUserId,
    id,
    pic,
    optionOneText,
    optionTwoText,
    askedBy

  };
}

export default withRouter(connect(mapStateToProp)(PollView))
