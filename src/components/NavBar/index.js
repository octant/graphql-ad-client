import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import { MY_NAME } from "./queries";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const {
      data: { error, loading, my }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand tag={Link} to="/">
            React Apollo
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/questions">
                  Questions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/users">
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to={`/users/${my.sAMAccountName}/show`}>
                  {my.displayName}
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default graphql(MY_NAME)(NavBar);
