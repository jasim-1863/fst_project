import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { logout } from '../actions/userActions';
import { FaUser, FaHospital, FaTint, FaSignOutAlt, FaList, FaHome, FaInfoCircle } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="custom-header">
      <Navbar bg="white" variant="light" expand="lg" collapseOnSelect className="py-3 shadow-sm">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center brand-logo">
              <FaTint className="me-2 text-danger" size={24} />
              <span className="fw-bold">Blood Donation</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className="nav-link-custom mx-2">
                  <FaHome className="me-1" /> Home
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/about">
                <Nav.Link className="nav-link-custom mx-2">
                  <FaInfoCircle className="me-1" /> About
                </Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/blood-requests">
                <Nav.Link className="nav-link-custom mx-2">
                  <FaList className="me-1" /> Requests
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <div className="d-inline">
                      {userInfo.role === 'donor' ? (
                        <>
                          <FaUser className="me-1" />
                          <Badge pill bg="danger" className="me-1">
                            {userInfo.bloodType || 'Donor'}
                          </Badge>
                          {userInfo.name}
                        </>
                      ) : (
                        <>
                          <FaHospital className="me-1" /> {userInfo.name}
                        </>
                      )}
                    </div>
                  }
                  id="username"
                  className="dropdown-custom mx-2"
                >
                  {userInfo.role === 'donor' ? (
                    <>
                      <LinkContainer to="/donor/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/donor/eligible-requests">
                        <NavDropdown.Item>Eligible Requests</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/donor/history">
                        <NavDropdown.Item>Donation History</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <>
                      <LinkContainer to="/institution/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/institution/blood-requests">
                        <NavDropdown.Item>Manage Blood Requests</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/institution/create-request">
                        <NavDropdown.Item>Create Request</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignOutAlt className="me-1" /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav className="d-flex gap-2">
                  <LinkContainer to="/login">
                    <Nav.Link className="nav-btn btn btn-outline-danger px-3">Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="nav-btn btn btn-danger px-3 text-white">Register</Nav.Link>
                  </LinkContainer>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header; 