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
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { SELECT_USER, MY_NAME } from "./queries";

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleProfileClick = username => {
    return () =>
      this.props
        .selectUser(username)
        .then(() => this.props.history.push(`/users/${username}`));
  };

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
                <NavLink
                  onClick={this.handleProfileClick("")}
                  tag={Link}
                  to="/users"
                >
                  Users
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={this.handleProfileClick(my.sAMAccountName)}
                  tag={Link}
                  to={this.props.location}
                >
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

export default compose(
  graphql(SELECT_USER, {
    props: ({ mutate }) => ({
      selectUser: username =>
        mutate({
          variables: { username }
        })
    })
  }),
  graphql(MY_NAME)
)(NavBar);
