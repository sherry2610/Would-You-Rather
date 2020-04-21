import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { fetchInitialData } from "../actions/shared";
import Login from "./Login";
import Menu from "./Menu";
import AllQuestion from "./AllQuestion";
import Add from "./Add";
import Leaderboard from "./Leaderboard";
import PollView from "./PollView";
import Result from "./Result";

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      fakeAuth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchInitialData());
  }

  render() {
    return (
      <Router>
        <Route path={["/", "/login"]} exact component={Login} />

        <PrivateRoute
          path={[
            "/home",
            "/add",
            "/questions/:id",
            "/question/:id",
            "/leaderboard",
          ]}
          component={Menu}
        />
        <PrivateRoute path="/home" exact component={AllQuestion} />
        <PrivateRoute path="/add" exact component={Add} />
        <PrivateRoute path="/questions/:id" exact component={PollView} />
        <PrivateRoute path="/question/:id" exact component={Result} />
        <PrivateRoute path="/leaderboard" exact component={Leaderboard} />
      </Router>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser,
  };
}

export default connect(mapStateToProps)(App);
