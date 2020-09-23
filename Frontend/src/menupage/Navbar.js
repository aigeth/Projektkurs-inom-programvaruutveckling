import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Nav,
  FormControl,
  Button,
  Form,
} from "react-bootstrap";

//@Baran Polat

/*The class represents the navbar which can be seen at the top of the page. Each NavDropdown item redirects
you to the chosen page*/
class NavbarOptions extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/menu/viewkeys">
          <img
            alt="rawfury"
            src={require("./rawF.png")}
            style={{ blockSize: 70 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/menu/viewkeys">View keys</Nav.Link>
            <Nav.Link href="/menu/addkey">Add key</Nav.Link>
            <Nav.Link href="/menu/newplatform">Add platform</Nav.Link>
            <Nav.Link href="/menu/newregion">Add region</Nav.Link>
            <Nav.Link href="/menu/newgame">Add game</Nav.Link>
            {JSON.parse(localStorage.getItem("user")).role == "ADMIN" ? (
              <Nav.Link href="/menu/manageusers">Manage users</Nav.Link>
            ) : (
              <div></div>
            )}
          </Nav>
          <Button onClick={this.props.handleLogout} variant="outline-success">
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavbarOptions;
