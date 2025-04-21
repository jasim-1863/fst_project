import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Badge, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTint, FaMapMarkerAlt, FaCalendarAlt, FaFilter, FaSort, FaSortAmountDown, FaSortAmountUp, FaHospital, FaExclamationCircle, FaArrowLeft } from 'react-icons/fa';
import { format } from 'date-fns';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getEligibleRequests } from '../actions/donorActions';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    y: -20, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const EligibleRequestsScreen = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [sortField, setSortField] = useState('requiredDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorEligibleRequests = useSelector((state) => state.donorEligibleRequests);
  const { loading, error, eligibleRequests } = donorEligibleRequests;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'donor') {
      history.push('/login');
    } else {
      dispatch(getEligibleRequests());
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (eligibleRequests) {
      let filtered = [...eligibleRequests];
      
      // Filter by search term
      if (filter) {
        filtered = filtered.filter(
          (request) =>
            request.patientName.toLowerCase().includes(filter.toLowerCase()) ||
            request.hospitalName.toLowerCase().includes(filter.toLowerCase()) ||
            request.location.toLowerCase().includes(filter.toLowerCase()) ||
            request.bloodType.toLowerCase().includes(filter.toLowerCase()) ||
            request.urgency.toLowerCase().includes(filter.toLowerCase())
        );
      }
      
      // Filter by urgency
      if (urgencyFilter !== 'all') {
        filtered = filtered.filter((request) => request.urgency === urgencyFilter);
      }
      
      // Sort the results
      filtered.sort((a, b) => {
        let comparison = 0;
        
        switch (sortBy) {
          case 'date':
            comparison = new Date(a.requiredDate) - new Date(b.requiredDate);
            break;
          case 'urgency':
            const urgencyOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
            comparison = urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
            break;
          case 'units':
            comparison = b.unitsRequired - a.unitsRequired;
            break;
          default:
            comparison = 0;
        }
        
        return comparison;
      });
      
      setFilteredRequests(filtered);
    }
  }, [eligibleRequests, filter, urgencyFilter, sortBy]);

  const formatDate = (date) => {
    if (!date) return 'Not specified';
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'Critical':
        return <Badge bg="danger" className="px-3 py-2">Critical</Badge>;
      case 'High':
        return <Badge bg="warning" className="px-3 py-2">High</Badge>;
      case 'Medium':
        return <Badge bg="info" className="px-3 py-2">Medium</Badge>;
      case 'Low':
        return <Badge bg="success" className="px-3 py-2">Low</Badge>;
      default:
        return <Badge bg="secondary" className="px-3 py-2">{urgency}</Badge>;
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField === field) {
      return sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />;
    }
    return <FaSort className="text-muted" />;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setUrgencyFilter('all');
    setSortField('requiredDate');
    setSortDirection('asc');
    setFilter('');
  };
  
  return (
    <Container className="py-4">
      <Meta title="Eligible Blood Requests" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="align-items-center mb-4">
          <Col xs={12} md={8}>
            <h1>
              <FaTint className="me-2 text-danger" />
              Eligible Blood Requests
            </h1>
            <p className="text-muted">
              View all blood requests that match your blood type and location
            </p>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <Link to="/donor/dashboard">
              <Button variant="outline-secondary" className="mb-3 mb-md-0">
                <FaArrowLeft className="me-2" /> Back to Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Row className="mb-4">
          <Col md={8}>
            <Form.Group controlId="filter">
              <Form.Control
                type="text"
                placeholder="Search by hospital, location, blood type or urgency..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border-primary"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="sortBy">
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-primary"
              >
                <option value="date">Sort by Date (Earliest first)</option>
                <option value="urgency">Sort by Urgency</option>
                <option value="units">Sort by Units Required</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </motion.div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredRequests.length === 0 ? (
        <motion.div variants={itemVariants}>
          <Message variant="info">
            No eligible blood requests found matching your search criteria.
          </Message>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row>
            {filteredRequests.map((request) => (
              <Col key={request._id} sm={12} md={6} lg={4} className="mb-4">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card className="h-100 shadow-sm border-0 request-card">
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <Badge
                        bg={
                          request.urgency === 'Critical'
                            ? 'danger'
                            : request.urgency === 'High'
                            ? 'warning'
                            : request.urgency === 'Medium'
                            ? 'primary'
                            : 'success'
                        }
                        className="py-2 px-3"
                      >
                        {request.urgency} Priority
                      </Badge>
                      <Badge bg="secondary" className="blood-type-badge">
                        {request.bloodType}
                      </Badge>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title className="mb-3">{request.patientName}</Card.Title>
                      <Card.Text as="div">
                        <p className="mb-2">
                          <FaHospital className="me-2 text-primary" />
                          {request.hospitalName}
                        </p>
                        <p className="mb-2">
                          <FaMapMarkerAlt className="me-2 text-danger" />
                          {request.location}
                        </p>
                        <p className="mb-2">
                          <FaCalendarAlt className="me-2 text-success" />
                          Required by: {formatDate(request.requiredDate)}
                        </p>
                        <p className="mb-2">
                          <FaTint className="me-2 text-danger" />
                          Units required: {request.unitsRequired}
                        </p>
                        {request.notes && (
                          <p className="mb-2 fst-italic text-muted">
                            "{request.notes}"
                          </p>
                        )}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 pt-0">
                      <Link to={`/blood-request/${request._id}`}>
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
          
          {eligibleRequests && eligibleRequests.length > 0 && filteredRequests.length === 0 && (
            <div className="text-center my-5">
              <FaFilter size={40} className="text-muted mb-3" />
              <h4>No results found</h4>
              <p className="text-muted">
                Try adjusting your search criteria to find more eligible blood requests
              </p>
              <Button variant="outline-primary" onClick={() => setFilter('')}>
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </Container>
  );
};

export default EligibleRequestsScreen; 