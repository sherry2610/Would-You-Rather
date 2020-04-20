import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { handleAddAnswer } from "../actions/questions";



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
      const {dispatch,currentUserId,id,toResultView} = this.props
      const {value} = this.state
    e.preventDefault();
    console.log("VALUE",value)
    dispatch(handleAddAnswer(currentUserId[0],id.id,value))
    setTimeout(()=>{toResultView(id)},1000)
  };
  render() {
    console.log("POLLVIEW", this.props)
    console.log("POLLVIEW STATE", this.state)
    const {askedBy,pic,optionOneText,optionTwoText} = this.props
    return (
        <div className='pollview-card'>
        
      <Form onSubmit={(e)=>{this.handleSubmitAnswer(e)}}>
      <h2>Asked By: {askedBy}</h2>
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

function mapStateToProp({ users,questions, loggedUser },{id}) {
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join("");
  const currentUserId = uid.filter((uid) => {
    if (users[uid].name === currentUser) {
      return users[uid].answers;
    }
  })
  //const pic = users[[questions[id]].author].avatarURL
  const pic = users[questions[id.id].author].avatarURL
  const optionOneText = questions[id.id].optionOne.text
  const optionTwoText = questions[id.id].optionTwo.text
  const askedBy = questions[id.id].author

  return {
    currentUserId,
    id,
    pic,
    optionOneText,
    optionTwoText,
    askedBy

  };
}

export default connect(mapStateToProp)(PollView);
