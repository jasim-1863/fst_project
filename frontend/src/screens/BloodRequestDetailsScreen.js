import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge, Button, ListGroup, Form, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaTint, FaHospital, FaUserAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaArrowLeft, FaInfoCircle, FaExclamationCircle, FaSyringe } from 'react-icons/fa';
import { format } from 'date-fns';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { getBloodRequestById } from '../actions/bloodRequestActions';
import { respondToRequest } from '../actions/donorActions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const BloodRequestDetailsScreen = ({ match, history }) => {
  const [response, setResponse] = useState('');
  const [availabilityDate, setAvailabilityDate] = useState('');
  const [showResponseForm, setShowResponseForm] = useState(false);
  const [units, setUnits] = useState(1);

  const requestId = match.params.id;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bloodRequestDetails = useSelector((state) => state.bloodRequestDetails);
  const { loading, error, bloodRequest } = bloodRequestDetails;

  const donorResponse = useSelector((state) => state.donorResponse);
  const { loading: loadingResponse, success: successResponse, error: errorResponse } = donorResponse;

  // Check if current user has already responded
  const hasResponded = bloodRequest?.responses?.some(
    (resp) => resp.donor?._id === userInfo?._id
  );

  // Get user's response if they've responded
  const userResponse = bloodRequest?.responses?.find(
    (resp) => resp.donor?._id === userInfo?._id
  );

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'donor') {
      history.push('/login');
    }

    if (successResponse) {
      history.push('/donor/dashboard');
    }
    
    dispatch(getBloodRequestById(requestId));
  }, [dispatch, requestId, history, userInfo, successResponse]);

  useEffect(() => {
    if (successResponse) {
      // Refresh blood request details after successful response
      dispatch(getBloodRequestById(requestId));
      setResponse('');
      setAvailabilityDate('');
      setShowResponseForm(false);
    }
  }, [successResponse, dispatch, requestId]);

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const handleSubmitResponse = (e) => {
    e.preventDefault();
    dispatch(
      respondToRequest({
        requestId,
        response,
        availabilityDate,
        units,
      })
    );
  };

  const getUrgencyBadge = (urgency) => {
    let variant;
    switch (urgency) {
      case 'Critical':
        variant = 'danger';
        break;
      case 'Urgent':
        variant = 'warning';
        break;
      default:
        variant = 'info';
    }
    return (
      <Badge bg={variant} className="px-3 py-2">
        {urgency}
      </Badge>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge bg="success" className="px-3 py-2">Open</Badge>;
      case 'fulfilled':
        return <Badge bg="info" className="px-3 py-2">Fulfilled</Badge>;
      case 'closed':
        return <Badge bg="danger" className="px-3 py-2">Closed</Badge>;
      default:
        return <Badge bg="secondary" className="px-3 py-2">{status}</Badge>;
    }
  };

  const canRespondToRequest = () => {
    return (
      userInfo && 
      userInfo.role === 'donor' && 
      bloodRequest?.status === 'open' && 
      !hasResponded && 
      userInfo.bloodType === bloodRequest?.bloodType
    );
  };

  const getRequestCardClass = () => {
    if (bloodRequest?.urgency === 'critical') return 'border-danger';
    if (bloodRequest?.urgency === 'high') return 'border-warning';
    if (bloodRequest?.urgency === 'medium') return 'border-info';
    return 'border-success';
  };

  const handleRespond = () => {
    dispatch(
      respondToRequest({
        requestId,
        units,
      })
    );
  };

  return (
    <Container className="py-4">
      <Meta title={bloodRequest?.patient?.name ? `Blood Request for ${bloodRequest.patient.name}` : 'Blood Request Details'} />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link className="btn btn-outline-secondary mb-4" to='/eligible-requests'>
          <FaArrowLeft className="me-2" /> Back to Eligible Requests
        </Link>
      </motion.div>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : !bloodRequest ? (
        <Message variant="info">Blood request not found</Message>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row>
            <Col md={7}>
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Body>
                    <h2 className="mb-4">
                      <FaTint className="me-2 text-danger" />
                      Blood Request Details
                    </h2>
                    
                    <div className="d-flex align-items-center mb-4">
                      <h4 className="me-3 mb-0">Blood Type: </h4>
                      <h3>
                        <Badge 
                          bg="danger" 
                          className="px-3 py-2 blood-type-badge"
                          style={{ fontSize: '1.2rem' }}
                        >
                          {bloodRequest.bloodType}
                        </Badge>
                      </h3>
                    </div>

                    <ListGroup variant="flush" className="mb-4">
                      <ListGroup.Item className="border-0 ps-0 py-3">
                        <div className="d-flex">
                          <div className="me-3">
                            <FaUserAlt size={24} className="text-primary" />
                          </div>
                          <div>
                            <h5 className="mb-1">Patient Information</h5>
                            <p className="mb-0">{bloodRequest.patient?.name || 'Anonymous'}</p>
                            {bloodRequest.patient?.age && (
                              <p className="mb-0">Age: {bloodRequest.patient.age}</p>
                            )}
                          </div>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-3">
                        <div className="d-flex">
                          <div className="me-3">
                            <FaHospital size={24} className="text-danger" />
                          </div>
                          <div>
                            <h5 className="mb-1">Hospital/Institution</h5>
                            <p className="mb-0">{bloodRequest.institution?.name}</p>
                          </div>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-3">
                        <div className="d-flex">
                          <div className="me-3">
                            <FaMapMarkerAlt size={24} className="text-success" />
                          </div>
                          <div>
                            <h5 className="mb-1">Location</h5>
                            <p className="mb-0">{bloodRequest.location}</p>
                          </div>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-3">
                        <div className="d-flex">
                          <div className="me-3">
                            <FaCalendarAlt size={24} className="text-info" />
                          </div>
                          <div>
                            <h5 className="mb-1">Dates</h5>
                            <p className="mb-0">
                              <strong>Requested:</strong> {formatDate(bloodRequest.createdAt)}
                            </p>
                            <p className="mb-0">
                              <strong>Required by:</strong> {formatDate(bloodRequest.requiredDate)}
                            </p>
                          </div>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 py-3">
                        <div className="d-flex">
                          <div className="me-3">
                            <FaSyringe size={24} className="text-secondary" />
                          </div>
                          <div>
                            <h5 className="mb-1">Units Information</h5>
                            <p className="mb-0">
                              <strong>Units Required:</strong> {bloodRequest.unitsRequired}
                            </p>
                            <p className="mb-0">
                              <strong>Units Collected:</strong> {bloodRequest.unitsCollected} ({Math.round((bloodRequest.unitsCollected / bloodRequest.unitsRequired) * 100)}%)
                            </p>
                            <div className="progress mt-2">
                              <div 
                                className="progress-bar bg-danger" 
                                role="progressbar" 
                                style={{ width: `${(bloodRequest.unitsCollected / bloodRequest.unitsRequired) * 100}%` }} 
                                aria-valuenow={(bloodRequest.unitsCollected / bloodRequest.unitsRequired) * 100} 
                                aria-valuemin="0" 
                                aria-valuemax="100">
                              </div>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    </ListGroup>
                    
                    {bloodRequest.purpose && (
                      <div className="mb-4">
                        <h5>Purpose/Description</h5>
                        <Card className="bg-light border-0">
                          <Card.Body>
                            <FaInfoCircle className="me-2 text-info" />
                            {bloodRequest.purpose}
                          </Card.Body>
                        </Card>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            <Col md={5}>
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm mb-4">
                  <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                    <h5 className="mb-0">Request Summary</h5>
                    {getUrgencyBadge(bloodRequest.urgency)}
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                        <span>Blood Type</span>
                        <span className="fw-bold">{bloodRequest.bloodType}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                        <span>Units Required</span>
                        <span className="fw-bold">{bloodRequest.unitsRequired}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                        <span>Units Collected</span>
                        <span className="fw-bold">{bloodRequest.unitsCollected}</span>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 pb-3">
                        <span>Still Needed</span>
                        <span className="fw-bold text-danger">{bloodRequest.unitsRequired - bloodRequest.unitsCollected}</span>
                      </ListGroup.Item>
                    </ListGroup>
                    
                    <div className="d-grid gap-2 mt-3">
                      {!showResponseForm ? (
                        <Button 
                          onClick={() => setShowResponseForm(true)} 
                          className="btn-lg"
                          disabled={bloodRequest.unitsRequired <= bloodRequest.unitsCollected}
                        >
                          <FaCheckCircle className="me-2" />
                          I want to donate
                        </Button>
                      ) : (
                        <Card className="border-0 bg-light">
                          <Card.Body>
                            <h5 className="mb-3">Confirm Your Donation</h5>
                            {errorResponse && <Message variant='danger'>{errorResponse}</Message>}
                            <Form>
                              <Form.Group controlId='units' className="mb-3">
                                <Form.Label>How many units can you donate?</Form.Label>
                                <Form.Control
                                  as='select'
                                  value={units}
                                  onChange={(e) => setUnits(Number(e.target.value))}
                                >
                                  {[...Array(Math.min(bloodRequest.unitsRequired - bloodRequest.unitsCollected, 2)).keys()].map(x => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                              <div className="d-flex justify-content-between">
                                <Button
                                  variant='secondary'
                                  className="flex-grow-1 me-2"
                                  onClick={() => setShowResponseForm(false)}
                                >
                                  <FaTimesCircle className="me-2" />
                                  Cancel
                                </Button>
                                <Button
                                  type='button'
                                  className="flex-grow-1"
                                  onClick={handleRespond}
                                  disabled={loadingResponse}
                                >
                                  {loadingResponse ? 'Confirming...' : 'Confirm Donation'}
                                </Button>
                              </div>
                            </Form>
                          </Card.Body>
                        </Card>
                      )}
                    </div>
                    
                    {bloodRequest.unitsRequired <= bloodRequest.unitsCollected && (
                      <Message variant='success' className="mt-3">
                        <FaCheckCircle className="me-2" />
                        This request has been fully fulfilled. Thank you to all donors who responded!
                      </Message>
                    )}
                  </Card.Body>
                </Card>
                
                <Card className="border-0 shadow-sm">
                  <Card.Body>
                    <h5 className="mb-3">Important Information</h5>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 ps-0 pb-2">
                        <FaInfoCircle className="me-2 text-info" />
                        Please bring a valid ID when you visit the hospital.
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 pb-2">
                        <FaInfoCircle className="me-2 text-info" />
                        Ensure you are well-rested and have eaten before donating.
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0 pb-2">
                        <FaInfoCircle className="me-2 text-info" />
                        Drink plenty of water before and after donation.
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0 ps-0">
                        <FaInfoCircle className="me-2 text-info" />
                        Contact the hospital directly for any specific questions.
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      )}
    </Container>
  );
};

export default BloodRequestDetailsScreen; 