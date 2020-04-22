import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import Page404 from "./Page404";

class Result extends Component {
  render() {
    console.log('RESULTS',this.props)
    const {
      askedBy,
      pic,
      id,
      qids,
      optionOneVotes,
      optionTwoVotes,
      optionTwoText,
      optionOneText,
      loggedInUserSelectedOption,
      sumOfUsersAnsweredThisQues,
    } = this.props;
    if(qids.includes(id)){
    const percentForOptOne = (
      (optionOneVotes.length / sumOfUsersAnsweredThisQues) *
      100
    ).toFixed(2);
    const percentForOptTwo = (
      (optionTwoVotes.length / sumOfUsersAnsweredThisQues) *
      100
    ).toFixed(2);


    return (
      <div className="pollview-card">
        <h6>Asked By: {askedBy}</h6>
        <Image
          src={pic}
          alt="profile pic"
          className="pollview-img"
          roundedCircle
        />
        <div className="bar-div">
        {loggedInUserSelectedOption===optionOneText?<p style={{border:"4px solid yellow",width:'500px'}}>{`YOU CHOOSE Option A : ${optionOneText}`}</p>:<p>{`Option A : ${optionOneText}`}</p>}
          
           <b>{`${optionOneVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option B`}</b>
          <ProgressBar
            now={percentForOptOne}
            label={`${percentForOptOne}%`}
            className="bar"
          />
          {loggedInUserSelectedOption===optionTwoText?<p style={{border:"4px solid yellow",width:'500px'}}>{`YOU CHOOSE Option B : ${optionTwoText}`}</p>:<p>{`Option B : ${optionTwoText}`}</p>}
          
          <b>{`${optionTwoVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option B`}</b>
          <ProgressBar
            now={percentForOptTwo}
            label={`${percentForOptTwo}%`}
            className="bar"
          />
        </div>
      </div>
    )
    }
    return <Page404 />
  }
}
function mapStateToProps({ users, questions, loggedUser }, props) {
  const { id } = props.match.params;
  const qids = Object.keys(questions)
  if(qids.includes(id)){
  const pic = users[questions[id].author].avatarURL;
  const optionOneVotes = questions[id].optionOne.votes;
  const optionOneText = questions[id].optionOne.text;
  const optionTwoVotes = questions[id].optionTwo.votes;
  const optionTwoText = questions[id].optionTwo.text;
  const sumOfUsersAnsweredThisQues =
    optionOneVotes.length + optionTwoVotes.length;
  const askedBy = users[questions[id].author].name;
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join("");
  const currentUserId = uid.filter((uid) => {return (users[uid].name === currentUser)?users[uid].answers : ''})
  const loggedInUserSelectedOption = optionOneVotes.includes(currentUserId[0])?optionOneText:optionTwoText
  return {
    id,
    qids,
    users,
    questions,
    pic,
    currentUserId,
    optionOneVotes,
    optionTwoVotes,
    optionOneText,
    optionTwoText,
    sumOfUsersAnsweredThisQues,
    askedBy,
    loggedInUserSelectedOption
  }
}
return{
  id,
  qids,
}
}

export default withRouter(connect(mapStateToProps)(Result));
