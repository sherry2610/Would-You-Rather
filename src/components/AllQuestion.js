import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionOverview from "./QuestionOverview";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


class AllQuestion extends Component {
  state = {
    answeredQues: [],
    unansweredQues: this.props.unanswered,
    answeredQuesBtn: false,
    unansweredQuesBtn: true,
    pollView:true,
     };
  showAnswered = () => {
    const { answered } = this.props;

    console.log("ANSWERED", answered);

    this.setState(() => ({
      answeredQues: answered,
      unansweredQues: false,
      answeredQuesBtn: true,
      unansweredQuesBtn: false,
      pollView:false,
    }));
  };
  showUnanswered = () => {
    const { unanswered } = this.props;
    this.setState(() => ({
      answeredQues: [],
      unansweredQues: unanswered,
      answeredQuesBtn: false,
      unansweredQuesBtn: true,
      pollView:true,
    }));
  };

  render() {
    console.log("allquestion", this.props);
    const {
      unansweredQues,
      answeredQues,
      unansweredQuesBtn,
      answeredQuesBtn,
      pollView,

    } = this.state;

    const pass = unansweredQues ? unansweredQues : answeredQues;
    console.log("allquestion state", this.state);
    console.log("allquestion", this.props);
    console.log("PASS", pass);

      return (
      <Container fluid style={{ border: "5px double #f5fc0f", width: "60%" }}>
        <Row>
          <Col>
            <Button
              variant="warning"
              size="lg"
              disabled=""
              style={{ width: "50%" }}
              onClick={this.showUnanswered}
              disabled={unansweredQuesBtn}
            >
              Unanswered Questions
            </Button>
            <Button
              variant="warning"
              size="lg"
              disabled=""
              style={{ width: "50%" }}
              onClick={this.showAnswered}
              disabled={answeredQuesBtn}
            >
              Answered Questions
            </Button>
          </Col>
        </Row>
        <ul className="overview-ul">
          {pass.map((id) => (
            <li key={id} className="overview-li">
              <QuestionOverview id={id} pollView={pollView} handleViewPoll={this.handleViewPoll} />
            </li>
          ))}
        </ul>
      </Container>
    
)  
  }
}
function mapStateToProps({ users, questions , loggedUser}) {
  // const qid = Object.keys(questions).sort(
  //   (a, b) => questions[b].timestamp - questions[a].timestamp
  // );
  // const currentUser = Object.values(loggedUser).join('')
  //  const uid = Object.keys(users);
  // const currentUserId = uid.filter((uid) => {
  //   if (users[uid].name === currentUser) {
  //     return users[uid].answers;
  //   }
  // });
  // return {
  //   uid,
  //   qid,
  //   currentUser,
  //   currentUserId
  //   }

  const qid = Object.keys(questions).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join('')
  const currentUserId = uid.filter((uid) => {
    if (users[uid].name === currentUser) {
      return users[uid].answers;
    }
  });
  const unanswered = [];

  const answered = Object.keys(users[currentUserId].answers);
  qid.forEach((id) => {
    !answered.includes(id) && unanswered.push(id);
  });
  return {
    loggedUser,
    currentUserId,
    qid,
    answered,
    unanswered,
  };
}

export default connect(mapStateToProps)(AllQuestion);
