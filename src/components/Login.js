import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import logo from "../assets/images/logo.png";
import Button from "react-bootstrap/Button";
import loggedUser from '../actions/loggedUser'

class Login extends Component {
  state = {
    loggedUser:''
  }
  handleChange = (e) =>{
    e.preventDefault()
    e.persist()
    this.setState({
      loggedUser:e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const {dispatch,manageView} = this.props

    dispatch(loggedUser(this.state.loggedUser))
    manageView()
  }
  render() {
    console.log("LOGIN", this.props)
    console.log("LOGIN STATE", this.state)
    const { name} = this.props;
    return (
      <div className="login-form">
        <Image className="login-image" src={logo} alt="game logo" />
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
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
            disabled={this.state.loggedUser ? false : true}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps({ users },{manageView}) {
  const uid = Object.keys(users);
  const name = uid.map((id) => users[id].name);

  return {
    name,
    manageView
  };
}

export default connect(mapStateToProps)(Login);
