import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { FaUserPlus, FaTint, FaHistory, FaClipboardList, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getInstitutionProfile } from '../actions/institutionActions';
import { getBloodRequests } from '../actions/bloodRequestActions';
import '../App.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const InstitutionDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const institutionProfile = useSelector((state) => state.institutionProfile);
  const { loading, error, institution } = institutionProfile;

  const bloodRequestList = useSelector((state) => state.bloodRequestList);
  const {
    loading: loadingBloodRequests,
    error: errorBloodRequests,
    bloodRequests,
  } = bloodRequestList;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (userInfo.role !== 'institution') {
      history.push('/');
    } else {
      dispatch(getInstitutionProfile());
      dispatch(getBloodRequests());
    }
  }, [dispatch, history, userInfo]);

  // Count active blood requests
  const activeBloodRequests = bloodRequests ? bloodRequests.filter(
    (request) => request.status === 'active'
  ).length : 0;

  // Count pending blood requests
  const pendingBloodRequests = bloodRequests ? bloodRequests.filter(
    (request) => request.status === 'pending'
  ).length : 0;

  // Count fulfilled blood requests
  const fulfilledBloodRequests = bloodRequests ? bloodRequests.filter(
    (request) => request.status === 'fulfilled'
  ).length : 0;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-3"
    >
      <Row className="align-items-center mb-4">
        <Col>
          <motion.h1 variants={itemVariants} className="page-title">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              `Welcome, ${institution?.name || 'Institution'}`
            )}
          </motion.h1>
          <motion.p 
            variants={itemVariants} 
            className="text-muted"
          >
            Your blood donation management dashboard
          </motion.p>
        </Col>
        <Col className="text-end">
          <motion.div variants={itemVariants}>
            <Link to="/institution/profile/edit">
              <Button variant="outline-primary" className="me-2">
                <FaUserPlus className="me-2" />
                Edit Profile
              </Button>
            </Link>
            <Link to="/blood-request/create">
              <Button variant="danger">
                <FaTint className="me-2" />
                Create Blood Request
              </Button>
            </Link>
          </motion.div>
        </Col>
      </Row>

      {loadingBloodRequests ? (
        <Loader />
      ) : errorBloodRequests ? (
        <Message variant="danger">{errorBloodRequests}</Message>
      ) : (
        <>
          <Row className="mb-4">
            <Col>
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-0 bg-gradient">
                  <Card.Body className="d-flex align-items-center">
                    <div className="rounded-circle bg-danger bg-opacity-10 p-3 me-3">
                      <FaChartLine className="text-danger fs-3" />
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">Blood Request Statistics</h6>
                      <h4 className="fw-bold mb-0">
                        {bloodRequests ? bloodRequests.length : 0} Total Requests
                      </h4>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <motion.div variants={itemVariants}>
                <Card className="mb-4 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="rounded-circle bg-success bg-opacity-10 p-3 d-inline-block mb-3">
                      <FaClipboardList className="text-success fs-3" />
                    </div>
                    <h3 className="fw-bold mb-1">{activeBloodRequests}</h3>
                    <p className="text-muted mb-3">Active Requests</p>
                    <Link to="/blood-requests">
                      <Button variant="outline-success" className="w-100">
                        View Active Requests
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div variants={itemVariants}>
                <Card className="mb-4 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="rounded-circle bg-warning bg-opacity-10 p-3 d-inline-block mb-3">
                      <FaTint className="text-warning fs-3" />
                    </div>
                    <h3 className="fw-bold mb-1">{pendingBloodRequests}</h3>
                    <p className="text-muted mb-3">Pending Requests</p>
                    <Link to="/blood-requests?status=pending">
                      <Button variant="outline-warning" className="w-100">
                        View Pending Requests
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col md={4}>
              <motion.div variants={itemVariants}>
                <Card className="mb-4 shadow-sm border-0">
                  <Card.Body className="text-center p-4">
                    <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-block mb-3">
                      <FaHistory className="text-info fs-3" />
                    </div>
                    <h3 className="fw-bold mb-1">{fulfilledBloodRequests}</h3>
                    <p className="text-muted mb-3">Fulfilled Requests</p>
                    <Link to="/blood-requests?status=fulfilled">
                      <Button variant="outline-info" className="w-100">
                        View Fulfilled Requests
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col>
              <motion.div variants={itemVariants}>
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-white">
                    <h5 className="mb-0">Recent Activity</h5>
                  </Card.Header>
                  <Card.Body>
                    {bloodRequests && bloodRequests.length > 0 ? (
                      bloodRequests.slice(0, 5).map((request) => (
                        <div
                          key={request._id}
                          className="d-flex align-items-center justify-content-between mb-3 p-3 rounded bg-light"
                        >
                          <div>
                            <h6 className="mb-1">
                              <span className={`badge ${
                                request.status === 'active'
                                  ? 'bg-success'
                                  : request.status === 'pending'
                                  ? 'bg-warning'
                                  : 'bg-info'
                              } me-2`}>
                                {request.status.toUpperCase()}
                              </span>
                              {request.bloodType} Request
                            </h6>
                            <p className="text-muted mb-0 small">
                              Created: {new Date(request.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Link to={`/blood-request/${request._id}`}>
                            <Button size="sm" variant="outline-dark">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-center mb-0 py-3">No recent activities to display</p>
                    )}
                  </Card.Body>
                  {bloodRequests && bloodRequests.length > 5 && (
                    <Card.Footer className="bg-white text-center">
                      <Link to="/blood-requests">
                        <Button variant="link" className="text-decoration-none">
                          View All Blood Requests
                        </Button>
                      </Link>
                    </Card.Footer>
                  )}
                </Card>
              </motion.div>
            </Col>
          </Row>
        </>
      )}
    </motion.div>
  );
};

export default InstitutionDashboardScreen; 