import React, { Component } from 'react';
import { Collapse,
          Navbar,
          NavbarToggler,
          NavbarBrand,
          Nav,
          NavItem,
          NavLink,Container
        } from 'reactstrap';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
              <NavbarBrand href="/">Customer List</NavbarBrand>
                <NavbarToggler onClick={this.toggle}>
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink href="https://github.com/jjadeseravla">Github</NavLink>
                      </NavItem>
                    </Nav>
                  </Collapse>
              </NavbarToggler>
          </Container>
        </Navbar>
      </div>
    );
    }
}


export default AppNavbar;
