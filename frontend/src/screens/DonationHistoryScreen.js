import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaHospital, FaTint, FaUserAlt, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { format } from 'date-fns';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getDonorHistory } from '../actions/donorActions';

const DonationHistoryScreen = () => {
  const dispatch = useDispatch();
  const [sortField, setSortField] = useState('donationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorHistory = useSelector((state) => state.donorHistory);
  const { loading, error, history } = donorHistory;

  useEffect(() => {
    dispatch(getDonorHistory());
  }, [dispatch]);

  // Format date properly
  const formatDate = (date) => {
    return format(new Date(date), 'MMMM dd, yyyy');
  };

  // Calculate total donations
  const totalDonations = history ? history.length : 0;
  const totalUnits = history ? history.reduce((acc, donation) => acc + donation.unitsProvided, 0) : 0;

  // Sort history
  const sortedHistory = history ? [...history].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'donationDate') {
      comparison = new Date(b.donationDate) - new Date(a.donationDate);
    } else if (sortField === 'hospital') {
      comparison = a.hospitalName.localeCompare(b.hospitalName);
    } else if (sortField === 'patient') {
      comparison = a.patientName.localeCompare(b.patientName);
    }
    
    return sortDirection === 'asc' ? comparison * -1 : comparison;
  }) : [];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Container className="py-4">
      <Meta title="Donation History" />
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Row className="align-items-center mb-4">
          <Col xs={12} md={8}>
            <h1>
              <FaTint className="me-2 text-danger" />
              Donation History
            </h1>
            <p className="text-muted">
              View your blood donation history and impact
            </p>
          </Col>
          <Col xs={12} md={4} className="text-md-end">
            <Link to="/donor/dashboard">
              <Button variant="outline-secondary">
                <FaArrowLeft className="me-2" /> Back to Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
      </motion.div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Row className="mb-4">
            <Col lg={4} className="mb-4 mb-lg-0">
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="text-center p-4">
                    <div className="mb-3">
                      {userInfo && userInfo.profileImage ? (
                        <img 
                          src={userInfo.profileImage}
                          alt={userInfo.name}
                          className="rounded-circle donor-profile-img mb-3"
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="donor-avatar bg-danger mb-3 mx-auto">
                          <FaUserAlt size={36} />
                        </div>
                      )}
                      <h5 className="mb-1">{userInfo?.name}</h5>
                      <Badge bg="danger" className="px-3 py-2 mb-3 blood-type-badge">
                        {userInfo?.bloodType}
                      </Badge>
                    </div>
                    
                    <div className="d-flex justify-content-center mb-3">
                      <div className="text-center px-3 border-end">
                        <h2 className="mb-0 fw-bold text-danger">{totalDonations}</h2>
                        <p className="text-muted mb-0">Donations</p>
                      </div>
                      <div className="text-center px-3">
                        <h2 className="mb-0 fw-bold text-danger">{totalUnits}</h2>
                        <p className="text-muted mb-0">Units</p>
                      </div>
                    </div>
                    
                    <p className="text-muted mb-0">
                      <FaInfoCircle className="me-2" />
                      You've potentially saved up to {totalUnits * 3} lives with your donations.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            
            <Col lg={8}>
              <motion.div variants={itemVariants}>
                <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Donation History</h5>
                      <div className="btn-group">
                        <button 
                          className={`btn btn-sm ${sortField === 'donationDate' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => {
                            if (sortField === 'donationDate') {
                              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('donationDate');
                              setSortDirection('desc');
                            }
                          }}
                        >
                          Date {sortField === 'donationDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                        <button 
                          className={`btn btn-sm ${sortField === 'hospital' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => {
                            if (sortField === 'hospital') {
                              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('hospital');
                              setSortDirection('asc');
                            }
                          }}
                        >
                          Hospital {sortField === 'hospital' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                        <button 
                          className={`btn btn-sm ${sortField === 'patient' ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => {
                            if (sortField === 'patient') {
                              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
                            } else {
                              setSortField('patient');
                              setSortDirection('asc');
                            }
                          }}
                        >
                          Patient {sortField === 'patient' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </button>
                      </div>
                    </div>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {sortedHistory.length === 0 ? (
                      <div className="text-center py-5">
                        <FaTint size={48} className="text-muted mb-3" />
                        <h5>No donations yet</h5>
                        <p className="text-muted mb-3">Your donation history will appear here once you donate blood.</p>
                        <Link to="/eligible-requests">
                          <Button variant="primary">
                            Find Eligible Requests
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <Table hover className="mb-0">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Patient</th>
                              <th>Hospital</th>
                              <th>Location</th>
                              <th>Units</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedHistory.map((donation) => (
                              <motion.tr 
                                key={donation._id}
                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                              >
                                <td>
                                  <div className="d-flex align-items-center">
                                    <FaCalendarAlt className="text-primary me-2" />
                                    {formatDate(donation.donationDate)}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <FaUserAlt className="text-secondary me-2" />
                                    {donation.patientName}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <FaHospital className="text-danger me-2" />
                                    {donation.hospitalName}
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <FaMapMarkerAlt className="text-success me-2" />
                                    {donation.location}
                                  </div>
                                </td>
                                <td>
                                  <Badge bg="info" pill>
                                    {donation.unitsProvided} {donation.unitsProvided === 1 ? 'unit' : 'units'}
                                  </Badge>
                                </td>
                                <td>
                                  <Badge 
                                    bg={donation.status === 'Completed' ? 'success' : 'warning'}
                                    pill
                                  >
                                    {donation.status}
                                  </Badge>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    )}
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

export default DonationHistoryScreen;