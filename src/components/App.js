import React, { Component } from "react";
import { connect } from "react-redux";
import { Route,Switch,  Redirect,withRouter } from "react-router-dom";
import { fetchInitialData } from "../actions/shared";
import Login from "./Login";
import Menu from "./Menu";
import AllQuestion from "./AllQuestion";
import Add from "./Add";
import Leaderboard from "./Leaderboard";
import PollView from "./PollView";
import Result from "./Result";
import Page404 from './Page404'

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
        <Redirect to={{
  pathname: '/login',
  state: { from: props.location }
}} />
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
      <div>
        

        <PrivateRoute
          path={[
            "/home",
            "/add",
            "/questions/:id",
            "/question/:id",
            "/leaderboard",
          ]}
          exact
          component={Menu}
        />
        <Switch>
        <Route path={["/", "/login"]} exact component={Login} />
        <PrivateRoute path="/home"  component={AllQuestion} />
        <PrivateRoute path="/add"  component={Add} />
        <PrivateRoute path="/questions/:id" component={PollView} />
        <PrivateRoute path="/question/:id" component={Result} />
        <PrivateRoute path="/leaderboard" component={Leaderboard} />
        <PrivateRoute component={Page404} />
        </Switch>
        </div>
    );
  }
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser,
  };
}

export default withRouter(connect(mapStateToProps)(App))
