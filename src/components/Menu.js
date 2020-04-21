import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logOut } from "../actions/loggedUser";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Menu = (props) => {
  const handleLogout = () => {
    props.dispatch(logOut());

    props.history.push("/login");
  };
  const { pic, name } = props;
  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/home">WOULD YOU RATHER</Link>
      <Nav className="mr-auto">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/add" className="nav-link" >ADD QUESTION</Link>
        <Link to="/leaderboard" className="nav-link" >Leaderboard</Link>
      </Nav>
      <Image
        src={pic}
        alt="profile pic"
        roundedCircle
        style={{ height: "50px" }}
      />
      <span style={{ color: "white" }}>{name}</span>
      <Button
        variant="outline-info"
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </Button>
    </Navbar>
  );
};

function mapStateToProps({ users, loggedUser }) {
  const uid = Object.keys(users);
  const currentUser = Object.values(loggedUser).join("");
  const currentUserId = uid.filter((uid) => {
    if (users[uid].name === currentUser) {
      return users[uid].answers;
    }
  });
  if (loggedUser) {
    const name = users[currentUserId].name;
    const pic = users[currentUserId].avatarURL;

    return {
      pic,
      name,
    };
  }
}

export default withRouter(connect(mapStateToProps)(Menu));
