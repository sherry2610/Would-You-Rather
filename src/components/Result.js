import React, { Component } from "react";
import { connect } from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Image from 'react-bootstrap/Image'

class Result extends Component {
    
  render() {
    console.log("RESULT", this.props);
    const {askedBy,pic,optionOneVotes,optionTwoVotes,sumOfUsersAnsweredThisQues} = this.props
    const percentForOptOne = ((optionOneVotes.length/sumOfUsersAnsweredThisQues)*100).toFixed(2)
    const percentForOptTwo = ((optionTwoVotes.length/sumOfUsersAnsweredThisQues)*100).toFixed(2)
    return (
    <div className="pollview-card">
    <h2>Asked By: {askedBy}</h2>
<Image src={pic} alt="profile pic" className='pollview-img' roundedCircle/>
<div className='bar-div'>
        {`${optionOneVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option A`}
        <ProgressBar now={percentForOptOne} label={`${percentForOptOne}%`} className='bar' />
        {`${optionTwoVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option B`}
        <ProgressBar now={percentForOptTwo} label={`${percentForOptTwo}%`} className='bar' />
        </div>
    </div>
    )
  }
}
function mapStateToProps({ users, questions }, { id }) {
    const pic = users[questions[id.id].author].avatarURL
    const optionOneVotes = questions[id.id].optionOne.votes
    const optionTwoVotes = questions[id.id].optionTwo.votes
    const sumOfUsersAnsweredThisQues =  optionOneVotes.length + optionTwoVotes.length
    const askedBy = questions[id.id].author
  return {
    users,
    questions,
    pic,
    optionOneVotes,
    optionTwoVotes,
    sumOfUsersAnsweredThisQues,
    askedBy
  };
}

export default connect(mapStateToProps)(Result);
