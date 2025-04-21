import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Badge, Container } from 'react-bootstrap';
import { FaUserEdit, FaTint, FaHistory, FaClipboardCheck, FaFileAlt, FaUserCircle, FaCalendarAlt, FaHeart, FaSearch, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getDonorProfile, getEligibleRequests } from '../actions/donorActions';
import '../App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const DonorDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorProfile = useSelector((state) => state.donorProfile);
  const { loading, error, donor } = donorProfile;

  const donorEligibleRequests = useSelector((state) => state.donorEligibleRequests);
  const {
    loading: loadingEligibleRequests,
    error: errorEligibleRequests,
    requests: eligibleRequests,
  } = donorEligibleRequests;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo.role !== 'donor') {
      history.push('/');
    } else {
      dispatch(getDonorProfile());
      dispatch(getEligibleRequests());
    }
  }, [dispatch, history, userInfo]);

  // Get the last donation date if available
  const lastDonation = donor?.donationHistory && donor.donationHistory.length > 0
    ? new Date(donor.donationHistory[0].donationDate).toLocaleDateString()
    : 'No previous donations';

  // Count total donations
  const totalDonations = donor?.donationHistory ? donor.donationHistory.length : 0;

  return (
    <Container className="py-4">
      <Meta title="Donor Dashboard" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="align-items-center mb-4">
          <Col>
            <h1 className="mb-0">
              <FaUserCircle className="me-2 text-primary" />
              Donor Dashboard
            </h1>
            <p className="text-muted mt-2">
              Welcome back, {userInfo?.name}! Track your eligibility, find donation opportunities, and manage your donor profile.
            </p>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-5"
      >
        <Row>
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Card className="h-100 shadow-sm profile-card">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <div className="profile-image mb-3">
                    <FaUserCircle size={50} className="text-primary" />
                  </div>
                  <Card.Title className="mb-3">Your Profile</Card.Title>
                  <Card.Text>
                    View and update your donor information, contact details, and preferences.
                  </Card.Text>
                  <Link to="/profile" className="mt-auto">
                    <Button variant="outline-primary" className="btn-block">
                      Manage Profile <FaArrowRight className="ms-2" />
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Card className="h-100 shadow-sm profile-card">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <div className="profile-image mb-3">
                    <FaCalendarAlt size={50} className="text-primary" />
                  </div>
                  <Card.Title className="mb-3">Donation History</Card.Title>
                  <Card.Text>
                    View your past donations, track your impact, and see your donation certificates.
                  </Card.Text>
                  <Link to="/donor/history" className="mt-auto">
                    <Button variant="outline-primary" className="btn-block">
                      View History <FaArrowRight className="ms-2" />
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          
          <Col md={4}>
            <motion.div variants={itemVariants}>
              <Card className="h-100 shadow-sm profile-card">
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <div className="profile-image mb-3">
                    <FaHeart size={50} className="text-primary" />
                  </div>
                  <Card.Title className="mb-3">Eligible Requests</Card.Title>
                  <Card.Text>
                    Find blood donation requests that match your blood type and location.
                  </Card.Text>
                  <Link to="/donor/eligible-requests" className="mt-auto">
                    <Button variant="outline-primary" className="btn-block">
                      View Requests <FaArrowRight className="ms-2" />
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Row className="mb-4">
          <Col>
            <h2 className="mb-4">
              <FaSearch className="me-2 text-primary" />
              Recent Blood Requests
            </h2>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                {eligibleRequests && eligibleRequests.length === 0 && (
                  <Message variant='info'>
                    No eligible blood requests found. Check back later or adjust your availability.
                  </Message>
                )}
                <Row>
                  {eligibleRequests &&
                    eligibleRequests.slice(0, 3).map((request) => (
                      <Col key={request._id} md={4} className="mb-4">
                        <motion.div
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="h-100 shadow-sm">
                            <Card.Body>
                              <Card.Title className="d-flex justify-content-between align-items-center">
                                <span>{request.bloodType}</span>
                                <span className="badge bg-primary">{request.urgency} Priority</span>
                              </Card.Title>
                              <Card.Text as="div">
                                <p><strong>Patient:</strong> {request.patientName}</p>
                                <p><strong>Hospital:</strong> {request.hospitalName}</p>
                                <p><strong>Required by:</strong> {new Date(request.requiredDate).toLocaleDateString()}</p>
                                <p><strong>Units:</strong> {request.unitsRequired}</p>
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-white">
                              <Link to={`/donor/request/${request._id}`}>
                                <Button variant="primary" className="w-100">
                                  View Details
                                </Button>
                              </Link>
                            </Card.Footer>
                          </Card>
                        </motion.div>
                      </Col>
                    ))}
                </Row>
                {eligibleRequests && eligibleRequests.length > 3 && (
                  <div className="text-center mt-3">
                    <Link to="/donor/eligible-requests">
                      <Button variant="outline-primary">
                        View All Eligible Requests <FaArrowRight className="ms-2" />
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default DonorDashboardScreen; 