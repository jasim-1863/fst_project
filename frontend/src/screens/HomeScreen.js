import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaHospital, FaUser, FaSearch, FaHeart, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomeScreen = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-4 fw-bold mb-4">Donate Blood, Save Lives</h1>
                <p className="lead mb-4">
                  Connect with healthcare institutions and join the community of blood donors making a difference.
                  Every donation helps save up to three lives!
                </p>
                <div className="d-flex gap-3">
                  <LinkContainer to="/register">
                    <Button variant="danger" size="lg" className="px-4 py-2">
                      Register Now
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/about">
                    <Button variant="outline-secondary" size="lg" className="px-4 py-2">
                      Learn More
                    </Button>
                  </LinkContainer>
                </div>
              </motion.div>
            </Col>
            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <Image 
                  src="https://img.freepik.com/free-vector/blood-donation-isometric-composition_1284-31238.jpg" 
                  fluid 
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Who Can Register Section */}
      <div className="py-5">
        <Container>
          <div className="home-heading">
            <h2>Who Can Register</h2>
            <p className="text-muted">Our platform serves both donors and medical institutions</p>
          </div>

          <Row className="mt-5">
            <Col md={6} className="mb-4">
              <motion.div
                whileHover={{ y: -10 }}
                className="h-100"
              >
                <Card className="h-100 border-0 shadow">
                  <Card.Body className="p-4 text-center">
                    <div className="icon-circle bg-danger text-white mb-4 mx-auto">
                      <FaUser size={30} />
                    </div>
                    <Card.Title as="h3" className="mb-3">Blood Donors</Card.Title>
                    <Card.Text className="mb-4">
                      Register as a donor to find blood donation requests matching your blood type. 
                      Track your donation history and help save lives.
                    </Card.Text>
                    <LinkContainer to="/register">
                      <Button variant="outline-danger">Register as Donor</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={6} className="mb-4">
              <motion.div
                whileHover={{ y: -10 }}
                className="h-100"
              >
                <Card className="h-100 border-0 shadow">
                  <Card.Body className="p-4 text-center">
                    <div className="icon-circle bg-primary text-white mb-4 mx-auto">
                      <FaHospital size={30} />
                    </div>
                    <Card.Title as="h3" className="mb-3">Medical Institutions</Card.Title>
                    <Card.Text className="mb-4">
                      Hospitals and blood banks can create blood donation requests, 
                      manage donors, and track blood inventory efficiently.
                    </Card.Text>
                    <LinkContainer to="/register">
                      <Button variant="outline-primary">Register as Institution</Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* How It Works Section */}
      <div className="bg-light py-5">
        <Container>
          <div className="home-heading">
            <h2>How It Works</h2>
            <p className="text-muted">Simple and straightforward process</p>
          </div>

          <Row className="mt-5">
            <Col lg={3} md={6} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="step-circle mx-auto mb-3">1</div>
                <h4>Register</h4>
                <p className="text-muted">
                  Create an account as a donor or medical institution.
                </p>
              </motion.div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="step-circle mx-auto mb-3">2</div>
                <h4>Find Matches</h4>
                <p className="text-muted">
                  Donors find compatible blood requests, institutions post requirements.
                </p>
              </motion.div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="step-circle mx-auto mb-3">3</div>
                <h4>Respond</h4>
                <p className="text-muted">
                  Donors respond to requests and schedule donations.
                </p>
              </motion.div>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="step-circle mx-auto mb-3">4</div>
                <h4>Save Lives</h4>
                <p className="text-muted">
                  Complete the donation and help save lives.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Benefits Section */}
      <div className="py-5">
        <Container>
          <div className="home-heading">
            <h2>Benefits</h2>
            <p className="text-muted">Why use our platform</p>
          </div>

          <Row className="mt-5">
            <Col md={4} className="mb-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="d-flex"
              >
                <div className="benefit-icon me-3">
                  <FaSearch className="text-danger" size={40} />
                </div>
                <div>
                  <h4>Easy Matching</h4>
                  <p className="text-muted">
                    Donors are automatically matched with compatible blood requests in their area.
                  </p>
                </div>
              </motion.div>
            </Col>
            <Col md={4} className="mb-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="d-flex"
              >
                <div className="benefit-icon me-3">
                  <FaHeart className="text-danger" size={40} />
                </div>
                <div>
                  <h4>Track Donations</h4>
                  <p className="text-muted">
                    Keep a record of your donation history and impact on the community.
                  </p>
                </div>
              </motion.div>
            </Col>
            <Col md={4} className="mb-4">
              <motion.div
                whileHover={{ x: 10 }}
                className="d-flex"
              >
                <div className="benefit-icon me-3">
                  <FaCheck className="text-danger" size={40} />
                </div>
                <div>
                  <h4>Efficient Process</h4>
                  <p className="text-muted">
                    Streamlined communication between donors and medical institutions.
                  </p>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className="bg-danger text-white py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Make a Difference?</h2>
          <p className="lead mb-4">
            Join our community today and help save lives through blood donation.
          </p>
          <LinkContainer to="/register">
            <Button variant="light" size="lg" className="px-4">
              Register Now
            </Button>
          </LinkContainer>
        </Container>
      </div>
    </>
  );
};

export default HomeScreen; 