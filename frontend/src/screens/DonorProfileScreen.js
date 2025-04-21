import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, ListGroup, Badge, Modal, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUserEdit, FaUserCircle, FaTint, FaCalendarAlt, FaMapMarkerAlt, 
  FaPhone, FaEnvelope, FaIdCard, FaClock, FaCheckCircle, 
  FaTimesCircle, FaExclamationCircle, FaHistory } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getDonorProfile, updateDonorProfile, updateAvailabilityStatus } from '../actions/donorActions';
import { DONOR_UPDATE_PROFILE_RESET } from '../constants/donorConstants';

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
    transition: { duration: 0.3 }
  }
};

const DonorProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [previousDonation, setPreviousDonation] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [confirmedStatus, setConfirmedStatus] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorProfile = useSelector((state) => state.donorProfile);
  const { loading, error, donor } = donorProfile;

  const donorUpdateProfile = useSelector((state) => state.donorUpdateProfile);
  const { success, error: updateError } = donorUpdateProfile;

  const availabilityUpdateStatus = useSelector((state) => state.availabilityUpdateStatus);
  const { loading: statusLoading, success: statusSuccess } = availabilityUpdateStatus;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'donor') {
      history.push('/login');
    } else {
      if (success) {
        dispatch({ type: DONOR_UPDATE_PROFILE_RESET });
        setEditMode(false);
      }
      
      if (!donor || !donor.name || success) {
        dispatch(getDonorProfile());
      } else {
        setName(donor.name);
        setEmail(donor.email);
        setBloodType(donor.bloodType);
        setAge(donor.age);
        setWeight(donor.weight);
        setPhone(donor.phone);
        setAddress(donor.address);
        setPreviousDonation(donor.previousDonation);
        setMedicalConditions(donor.medicalConditions);
      }
    }
  }, [dispatch, history, userInfo, donor, success, statusSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDonorProfile({
        _id: donor._id,
        name,
        email,
        bloodType,
        age,
        weight,
        phone,
        address,
        previousDonation,
        medicalConditions,
      })
    );
  };

  const handleStatusChange = (status) => {
    setConfirmedStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = () => {
    dispatch(updateAvailabilityStatus(confirmedStatus));
    setShowStatusModal(false);
  };

  const getAvailabilityBadge = () => {
    if (!donor) return null;
    
    switch(donor.availabilityStatus) {
      case 'available':
        return <Badge bg="success" className="px-3 py-2"><FaCheckCircle className="me-2" />Available</Badge>;
      case 'unavailable':
        return <Badge bg="danger" className="px-3 py-2"><FaTimesCircle className="me-2" />Unavailable</Badge>;
      case 'pending':
        return <Badge bg="warning" className="px-3 py-2"><FaExclamationCircle className="me-2" />Pending</Badge>;
      default:
        return <Badge bg="secondary" className="px-3 py-2">Unknown</Badge>;
    }
  };

  const getEligibilityInfo = () => {
    const lastDonation = donor?.previousDonation;
    
    if (!lastDonation) {
      return {
        isEligible: true,
        message: "You're eligible to donate blood.",
        variant: "success"
      };
    }
    
    const lastDonationDate = new Date(lastDonation);
    const today = new Date();
    const daysSinceLastDonation = Math.floor((today - lastDonationDate) / (1000 * 60 * 60 * 24));
    const daysToWait = 90 - daysSinceLastDonation;
    
    if (daysSinceLastDonation >= 90) {
      return {
        isEligible: true,
        message: "You're eligible to donate blood.",
        variant: "success"
      };
    } else {
      return {
        isEligible: false,
        message: `You'll be eligible to donate in ${daysToWait} days.`,
        variant: "warning"
      };
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-3 donor-profile-container"
    >
      <Row>
        <Col md={4} className="mb-4">
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm profile-card h-100">
              <Card.Body className="text-center">
                <div className="profile-image mb-4">
                  <FaUserCircle size={100} className="text-primary" />
                </div>
                <h2 className="profile-name">{donor?.name}</h2>
                <div className="mb-3 d-flex justify-content-center">
                  <Badge bg="primary" className="blood-type-badge px-3 py-2">
                    <FaTint className="me-1" /> {donor?.bloodType}
                  </Badge>
                  <div className="ms-2">{getAvailabilityBadge()}</div>
                </div>
                <div className="status-buttons mt-3">
                  <Button 
                    variant={donor?.availabilityStatus === 'available' ? 'success' : 'outline-success'} 
                    className="me-2 mb-2 px-3"
                    onClick={() => handleStatusChange('available')}
                    disabled={donor?.availabilityStatus === 'available'}
                  >
                    <FaCheckCircle className="me-2" /> Available
                  </Button>
                  <Button 
                    variant={donor?.availabilityStatus === 'unavailable' ? 'danger' : 'outline-danger'} 
                    className="mb-2 px-3"
                    onClick={() => handleStatusChange('unavailable')}
                    disabled={donor?.availabilityStatus === 'unavailable'}
                  >
                    <FaTimesCircle className="me-2" /> Unavailable
                  </Button>
                </div>
                <hr />
                {donor?.previousDonation && (
                  <div className="mb-3 text-center last-donation-info">
                    <div className="text-muted mb-1">Last Donation</div>
                    <div className="d-flex align-items-center justify-content-center">
                      <FaCalendarAlt className="me-2 text-secondary" />
                      <span>{new Date(donor.previousDonation).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
                {getEligibilityInfo().message && (
                  <Alert variant={getEligibilityInfo().variant} className="mb-3 eligibility-alert">
                    {getEligibilityInfo().message}
                  </Alert>
                )}
                <div className="mt-3">
                  <Link to="/donor/donation-history" className="btn btn-outline-primary w-100 donation-history-btn">
                    <FaHistory className="me-2" /> View Donation History
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
        
        <Col md={8}>
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white d-flex justify-content-between align-items-center profile-header">
                <h3 className="m-0">Profile Information</h3>
                <Button 
                  variant={editMode ? "secondary" : "primary"} 
                  className="edit-profile-btn"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : <><FaUserEdit className="me-2" /> Edit Profile</>}
                </Button>
              </Card.Header>
              <Card.Body>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {updateError && <Message variant="danger">{updateError}</Message>}
                {success && <Message variant="success">Profile Updated Successfully</Message>}
                
                {editMode ? (
                  <Form onSubmit={submitHandler}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Blood Type</Form.Label>
                          <Form.Select
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                          >
                            <option value="">Select blood type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Age</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Weight (kg)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter weight"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Previous Donation Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={previousDonation ? previousDonation.substring(0, 10) : ''}
                            onChange={(e) => setPreviousDonation(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Medical Conditions</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter any medical conditions or allergies"
                        value={medicalConditions}
                        onChange={(e) => setMedicalConditions(e.target.value)}
                      />
                    </Form.Group>

                    <Button type="submit" variant="success" className="w-100">
                      Update Profile
                    </Button>
                  </Form>
                ) : (
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaIdCard className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Full Name</div>
                        <div className="fw-bold">{donor?.name}</div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaEnvelope className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Email Address</div>
                        <div className="fw-bold">{donor?.email}</div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaTint className="text-danger" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Blood Type</div>
                        <div className="fw-bold">{donor?.bloodType}</div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaPhone className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Phone Number</div>
                        <div className="fw-bold">{donor?.phone || 'Not provided'}</div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaMapMarkerAlt className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Address</div>
                        <div className="fw-bold">{donor?.address || 'Not provided'}</div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaCalendarAlt className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Age / Weight</div>
                        <div className="fw-bold">
                          {donor?.age ? `${donor.age} years` : 'Age not provided'} / 
                          {donor?.weight ? `${donor.weight} kg` : 'Weight not provided'}
                        </div>
                      </div>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="d-flex py-3">
                      <div className="profile-icon me-3">
                        <FaClock className="text-primary" />
                      </div>
                      <div className="flex-grow-1">
                        <div className="text-muted small">Previous Donation</div>
                        <div className="fw-bold">
                          {donor?.previousDonation 
                            ? new Date(donor.previousDonation).toLocaleDateString() 
                            : 'No previous donations'}
                        </div>
                      </div>
                    </ListGroup.Item>
                    
                    {donor?.medicalConditions && (
                      <ListGroup.Item className="py-3">
                        <div className="text-muted small mb-1">Medical Conditions</div>
                        <div>{donor.medicalConditions}</div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                )}
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Status Change Confirmation Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Status Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmedStatus === 'available' ? (
            <p>Are you sure you want to set your status to <strong>Available</strong>? 
              This will make you visible to institutions looking for donors with your blood type.</p>
          ) : (
            <p>Are you sure you want to set your status to <strong>Unavailable</strong>? 
              You won't receive new blood donation requests while in this status.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button 
            variant={confirmedStatus === 'available' ? 'success' : 'danger'} 
            onClick={confirmStatusChange}
            disabled={statusLoading}
          >
            {statusLoading ? 'Updating...' : 'Confirm'}
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default DonorProfileScreen; 