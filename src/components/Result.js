import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";

class Result extends Component {
  render() {
    const {
      askedBy,
      pic,
      optionOneVotes,
      optionTwoVotes,
      sumOfUsersAnsweredThisQues,
    } = this.props;
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
          {`${optionOneVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option A`}
          <ProgressBar
            now={percentForOptOne}
            label={`${percentForOptOne}%`}
            className="bar"
          />
          {`${optionTwoVotes.length} out of ${sumOfUsersAnsweredThisQues} selected option B`}
          <ProgressBar
            now={percentForOptTwo}
            label={`${percentForOptTwo}%`}
            className="bar"
          />
        </div>
      </div>
    );
  }
}
function mapStateToProps({ users, questions }, props) {
  const { id } = props.match.params;
  const pic = users[questions[id].author].avatarURL;
  const optionOneVotes = questions[id].optionOne.votes;
  const optionTwoVotes = questions[id].optionTwo.votes;
  const sumOfUsersAnsweredThisQues =
    optionOneVotes.length + optionTwoVotes.length;
  const askedBy = users[questions[id].author].name;
  return {
    users,
    questions,
    pic,
    optionOneVotes,
    optionTwoVotes,
    sumOfUsersAnsweredThisQues,
    askedBy,
  };
}

export default withRouter(connect(mapStateToProps)(Result));
