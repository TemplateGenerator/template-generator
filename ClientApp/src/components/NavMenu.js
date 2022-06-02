import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
// import { toast } from 'react-toastify';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      // isAuthenticated: false
    };
  }

  // componentDidMount(){
  //   setInterval(
  //     () => {
  //       axios({
  //         method: 'GET',
  //         url: '/accounts/isauthenticated'
  //       }).then(res => {
  //           this.setState({isAuthenticated: res.data})
  //       })
  //     },5000
  //   );
  // }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  // handleSignout(){
  //   axios({
  //     method: 'POST',
  //     url: '/accounts/signout'
  //   }).then(res => {
  //       if(res.data.code == 200){
  //         toast.success('Sign out successful!!', {
  //           position: "top-center",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           progress: undefined,
  //           });
  //         this.props.history.push({pathname: '/signin'});
  //       }
  //       else{
  //         toast.error(res.data.message, {
  //           position: "top-center",
  //           autoClose: 1500,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: false,
  //           draggable: true,
  //           progress: undefined,
  //           });
  //       }
  //   }).catch(error=>{toast.error('Something went wrong, please try again!!', {
  //     position: "top-center",
  //     autoClose: 1500,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     });})
  // }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/"><b>Template Book</b></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/admin">Admin</NavLink>
                </NavItem>
                {/* {this.state.isAuthenticated ?
                <NavItem>
                  <NavLink tag={Link} className="text-dark" onClick={this.handleSignout}>Sign out</NavLink>
                </NavItem>:<></>} */}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
