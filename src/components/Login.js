import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { loggedUser } from "../actions/loggedUser";
import { fakeAuth } from "./App";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logo from "../assets/images/logo.png";
import Button from "react-bootstrap/Button";

class Login extends Component {
  state = {
    redirectToReferrer: false,
    loggedinUser: "",
  };
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }));
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState({
      loggedinUser: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { loggedinUser } = this.state;
    const { dispatch } = this.props;

    dispatch(loggedUser(loggedinUser));
    this.login();
  };
  render() {
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      return <Redirect to="/home" />;
    }
    const { name } = this.props;
    return (
      <div className="login-form">
        <Image className="login-image" src={logo} alt="game logo" />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Form.Group
            controlId="exampleForm.ControlSelect1"
            className="login-form-controls"
          >
            <Form.Label>Select User for Login</Form.Label>
            <Form.Control as="select" onChange={(e) => this.handleChange(e)}>
              <option value="">Select</option>
              {name.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="login-btn"
            disabled={this.state.loggedinUser ? false : true}
          >
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const uid = Object.keys(users);
  const name = uid.map((id) => users[id].name);

  return {
    name,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
