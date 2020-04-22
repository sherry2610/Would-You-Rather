import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

class QuestionOverview extends Component {
  render() {
    const { id, askedBy, pic, questionText, pollView } = this.props;

    return (
      <div>
        <Row>
          <Col className="overview-card">
            <div className="overview-info">
              <h6>{askedBy} asking Would you rather...</h6>
              <Image src={pic} alt="profile pic" roundedCircle />
              <span className="overview-text">{questionText}</span>
              <br />
              <Button>
                {pollView ? (
                  <Link to={`/questions/${id}`} className="btn">
                    Poll View
                  </Link>
                ) : (
                  <Link to={`/question/${id}`} className="btn">Poll View</Link>
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
function mapStateToProp({ users, questions }, { id, pollView }) {
  const pic = users[questions[id].author].avatarURL;
  const questionText = questions[id].optionOne.text;
  const askedBy = users[questions[id].author].name;
  return {
    id,
    pic,
    questionText,
    pollView,
    askedBy,
  };
}

export default withRouter(connect(mapStateToProp)(QuestionOverview));
