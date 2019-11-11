import React, { Component } from "react";
import {
  Navbar,
  Button,
  Nav
} from "react-bootstrap";
import "./App.css";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand className="appHeader">React-Todo</Navbar.Brand>
          <Nav className="mr-auto">
            {
              isAuthenticated() && (
                <Nav.Link onClick={this.goTo.bind(this, 'manage')}>Dashboard</Nav.Link>
              )
            }
            {
              isAuthenticated() && (
                <Nav.Link onClick={this.goTo.bind(this, 'alltodos')}>All Todos</Nav.Link>
              )
            }
            {
              !isAuthenticated() && (
                <Button variant="outline-info" onClick={this.login.bind(this)}>Login</Button>
              )
            }
            {
              isAuthenticated() && (
                <Button variant="outline-info" onClick={this.logout.bind(this)}>Logout</Button>
              )
            }
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default App;
