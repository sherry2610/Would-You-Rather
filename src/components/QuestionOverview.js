import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class QuestionOverview extends Component {
  render() {
    const { id, askedBy, pic, questionText } = this.props;

    return (
      <div>
        <Row>
          <Col className="overview-card">
            <div className="overview-info">
            <h2>Asked By: {askedBy}</h2>
              <Image src={pic} alt="profile pic" roundedCircle />
              <span className="overview-text">{questionText}</span>
              <br />
              <Button
                className="overview-btn"
                onClick={() => {
                  this.props.toPollView({ id });
                }}
              >
                View Poll
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
function mapStateToProp({ users, questions }, { id, pollView }) {
  const pic = users[questions[id].author].avatarURL;
  const questionText = questions[id].optionOne.text;
  const askedBy = questions[id].author
  return {
    id,
    pic,
    questionText,
    pollView,
    askedBy
  };
}

export default connect(mapStateToProp)(QuestionOverview);
