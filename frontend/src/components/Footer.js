import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTint, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
         FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <FaTint className="text-danger me-2" size={24} />
              <h5 className="m-0 fw-bold">Blood Donation</h5>
            </div>
            <p className="text-muted">
              Connecting donors with medical institutions to save lives through timely and efficient blood donations.
            </p>
            <div className="d-flex mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="me-3 social-icon">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="me-3 social-icon">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="me-3 social-icon">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                <FaLinkedin size={20} />
              </a>
            </div>
          </Col>
          <Col md={2} sm={6} className="mb-4">
            <h5 className="mb-4 fw-bold">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About</Link>
              </li>
              <li className="mb-2">
                <Link to="/blood-requests">Requests</Link>
              </li>
              <li className="mb-2">
                <Link to="/register">Register</Link>
              </li>
              <li className="mb-2">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} sm={6} className="mb-4">
            <h5 className="mb-4 fw-bold">Resources</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/about">Donation Process</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">Eligibility</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">Blood Types</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">FAQs</Link>
              </li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="mb-4 fw-bold">Contact</h5>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <FaMapMarkerAlt className="me-2" /> 123 Medical Center Drive
              </li>
              <li className="mb-2">
                <FaPhone className="me-2" /> (123) 456-7890
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2" /> info@blooddonation.org
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="mt-4 mb-4" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Blood Donation. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 