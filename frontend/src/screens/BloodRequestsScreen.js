import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Badge, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaTint, FaCalendarAlt } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getBloodRequests } from '../actions/bloodRequestActions';

const BloodRequestsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pageNumber = 1, keyword = '' } = useParams();

  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const bloodRequests = useSelector((state) => state.bloodRequests);
  const { loading, error, bloodRequests: requests, pages, page } = bloodRequests;

  useEffect(() => {
    dispatch(getBloodRequests(keyword, bloodTypeFilter, urgencyFilter, 'Open', pageNumber));
  }, [dispatch, keyword, bloodTypeFilter, urgencyFilter, pageNumber]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/blood-requests/search/${searchKeyword}`);
    } else {
      navigate('/blood-requests');
    }
  };

  const getUrgencyClass = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return 'urgency-critical';
      case 'High':
        return 'urgency-high';
      case 'Medium':
        return 'urgency-medium';
      case 'Low':
        return 'urgency-low';
      default:
        return '';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.3
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <Container className="blood-requests-container py-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className='align-items-center mb-4'>
          <Col>
            <h1 className="page-title">
              <FaTint className="me-2 text-danger" />
              Blood Requests
            </h1>
            <p className="text-muted">Find blood donation requests that need your help</p>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="search-section bg-light p-4 rounded shadow-sm mb-4"
      >
        <Form onSubmit={handleSearch}>
          <Row className='align-items-center'>
            <Col md={8}>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaSearch className="text-danger" />
                </span>
                <Form.Control
                  type='text'
                  placeholder='Search by location or description...'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="border-start-0"
                ></Form.Control>
              </div>
            </Col>
            <Col md={2}>
              <Button type='submit' variant='danger' className='w-100'>
                Search
              </Button>
            </Col>
            <Col md={2}>
              <Button 
                variant='outline-secondary' 
                className='w-100'
                onClick={() => setShowFilters(!showFilters)}
              >
                <FaFilter className="me-2" />
                Filters
              </Button>
            </Col>
          </Row>
          
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Row className='mt-3'>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Blood Type</Form.Label>
                    <Form.Select
                      value={bloodTypeFilter}
                      onChange={(e) => setBloodTypeFilter(e.target.value)}
                    >
                      <option value=''>All Blood Types</option>
                      <option value='A+'>A+</option>
                      <option value='A-'>A-</option>
                      <option value='B+'>B+</option>
                      <option value='B-'>B-</option>
                      <option value='AB+'>AB+</option>
                      <option value='AB-'>AB-</option>
                      <option value='O+'>O+</option>
                      <option value='O-'>O-</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Urgency Level</Form.Label>
                    <Form.Select
                      value={urgencyFilter}
                      onChange={(e) => setUrgencyFilter(e.target.value)}
                    >
                      <option value=''>All Urgency Levels</option>
                      <option value='Critical'>Critical</option>
                      <option value='High'>High</option>
                      <option value='Medium'>Medium</option>
                      <option value='Low'>Low</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </motion.div>
          )}
        </Form>
      </motion.div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {requests && requests.length === 0 ? (
            <Message>No blood requests found</Message>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Row>
                {requests.map((request) => (
                  <Col key={request._id} md={6} lg={4} className='mb-4'>
                    <motion.div variants={itemVariants}>
                      <Card className='h-100 blood-request-card shadow-sm'>
                        <Card.Header className={`d-flex justify-content-between align-items-center ${getUrgencyClass(request.urgencyLevel)}`}>
                          <Badge 
                            bg={request.urgencyLevel === 'Critical' ? 'danger' : 
                                request.urgencyLevel === 'High' ? 'warning' : 
                                request.urgencyLevel === 'Medium' ? 'info' : 'success'}
                            className="py-2 px-3"
                          >
                            {request.urgencyLevel}
                          </Badge>
                          <Badge bg='danger' className="blood-type-badge">
                            <FaTint className="me-1" /> {request.bloodType}
                          </Badge>
                        </Card.Header>
                        <Card.Body>
                          <Card.Title className="mb-3">{request.institution?.name || 'Medical Institution'}</Card.Title>
                          <div className="request-details">
                            <p className="mb-2">
                              <FaMapMarkerAlt className="text-secondary me-2" />
                              <span className="text-muted">Location:</span> {request.location}
                            </p>
                            <p className="mb-2">
                              <FaTint className="text-danger me-2" />
                              <span className="text-muted">Quantity:</span> {request.quantity} units
                            </p>
                            <p className="mb-2">
                              <FaCalendarAlt className="text-secondary me-2" />
                              <span className="text-muted">Required By:</span> {request.requiredBy ? 
                                new Date(request.requiredBy).toLocaleDateString() : 'As soon as possible'}
                            </p>
                          </div>
                          {request.description && (
                            <Card.Text className="description-text mt-3">
                              {request.description.substring(0, 100)}
                              {request.description.length > 100 ? '...' : ''}
                            </Card.Text>
                          )}
                        </Card.Body>
                        <Card.Footer className='bg-white border-0 pb-3'>
                          <Button 
                            variant='outline-danger' 
                            className='w-100 view-details-btn'
                            onClick={() => navigate(`/blood-request/${request._id}`)}
                          >
                            View Details
                          </Button>
                        </Card.Footer>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </motion.div>
          )}
          {pages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Row className='mt-4'>
                <Col className='text-center pagination-container'>
                  {[...Array(pages).keys()].map((p) => (
                    <Link
                      key={p + 1}
                      to={`/blood-requests/page/${p + 1}`}
                      className={`mx-1 btn ${
                        p + 1 === page ? 'btn-danger' : 'btn-outline-danger'
                      } pagination-button`}
                    >
                      {p + 1}
                    </Link>
                  ))}
                </Col>
              </Row>
            </motion.div>
          )}
        </>
      )}
    </Container>
  );
};

export default BloodRequestsScreen; 