import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { updateDonorProfile } from '../actions/donorActions';
import { updateInstitutionProfile } from '../actions/institutionActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('account');

  // Donor profile states
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorBloodType, setDonorBloodType] = useState('');
  const [donorStreet, setDonorStreet] = useState('');
  const [donorCity, setDonorCity] = useState('');
  const [donorState, setDonorState] = useState('');
  const [donorZipCode, setDonorZipCode] = useState('');
  const [donorCountry, setDonorCountry] = useState('');
  const [donorAvailabilityStatus, setDonorAvailabilityStatus] = useState('available');

  // Institution profile states
  const [instName, setInstName] = useState('');
  const [instContactPerson, setInstContactPerson] = useState('');
  const [instPhone, setInstPhone] = useState('');
  const [instDescription, setInstDescription] = useState('');
  const [instOperatingHours, setInstOperatingHours] = useState('');
  const [instStreet, setInstStreet] = useState('');
  const [instCity, setInstCity] = useState('');
  const [instState, setInstState] = useState('');
  const [instZipCode, setInstZipCode] = useState('');
  const [instCountry, setInstCountry] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const donorProfile = useSelector((state) => state.donorProfile);
  const { 
    loading: loadingDonor, 
    error: errorDonor
  } = donorProfile;

  const donorUpdateProfile = useSelector((state) => state.donorUpdateProfile);
  const { loading: loadingDonorUpdate, error: errorDonorUpdate, success: successDonorUpdate } = donorUpdateProfile;

  const institutionProfile = useSelector((state) => state.institutionProfile);
  const { 
    loading: loadingInstitution, 
    error: errorInstitution
  } = institutionProfile;

  const institutionUpdateProfile = useSelector((state) => state.institutionUpdateProfile);
  const { 
    loading: loadingInstitutionUpdate,
    error: errorInstitutionUpdate, 
    success: successInstitutionUpdate 
  } = institutionUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.email || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails());
      } else {
        setEmail(user.email);
        
        if (user.role === 'donor' && user.profile) {
          setDonorName(user.profile.name || '');
          setDonorPhone(user.profile.phone || '');
          setDonorBloodType(user.profile.bloodType || '');
          setDonorAvailabilityStatus(user.profile.availabilityStatus || 'available');
          
          if (user.profile.address) {
            setDonorStreet(user.profile.address.street || '');
            setDonorCity(user.profile.address.city || '');
            setDonorState(user.profile.address.state || '');
            setDonorZipCode(user.profile.address.zipCode || '');
            setDonorCountry(user.profile.address.country || '');
          }
        } else if (user.role === 'institution' && user.profile) {
          setInstName(user.profile.name || '');
          setInstContactPerson(user.profile.contactPerson || '');
          setInstPhone(user.profile.phone || '');
          setInstDescription(user.profile.description || '');
          setInstOperatingHours(user.profile.operatingHours || '');
          
          if (user.profile.location) {
            setInstStreet(user.profile.location.street || '');
            setInstCity(user.profile.location.city || '');
            setInstState(user.profile.location.state || '');
            setInstZipCode(user.profile.location.zipCode || '');
            setInstCountry(user.profile.location.country || '');
          }
        }
      }
    }
  }, [dispatch, navigate, userInfo, user, success, successDonorUpdate, successInstitutionUpdate]);

  const submitAccountHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Update account info
      dispatch(
        updateUserProfile({
          id: user._id,
          email,
          password: password ? password : undefined,
        })
      );
      setMessage(null);
    }
  };

  const submitDonorProfileHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDonorProfile({
        name: donorName,
        phone: donorPhone,
        bloodType: donorBloodType,
        availabilityStatus: donorAvailabilityStatus,
        address: {
          street: donorStreet,
          city: donorCity,
          state: donorState,
          zipCode: donorZipCode,
          country: donorCountry,
        },
      })
    );
  };

  const submitInstitutionProfileHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateInstitutionProfile({
        name: instName,
        contactPerson: instContactPerson,
        phone: instPhone,
        description: instDescription,
        operatingHours: instOperatingHours,
        location: {
          street: instStreet,
          city: instCity,
          state: instState,
          zipCode: instZipCode,
          country: instCountry,
        },
      })
    );
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Card className="p-3 mb-3">
          <div className="text-center mb-3">
            <i className={`fas fa-user-circle fa-5x ${userInfo && userInfo.role === 'donor' ? 'text-primary' : 'text-danger'}`}></i>
          </div>
          <h4 className="text-center">{email}</h4>
          <p className="text-center text-muted">
            {userInfo && userInfo.role === 'donor'
              ? 'Donor Account'
              : userInfo && userInfo.role === 'institution'
              ? 'Institution Account'
              : 'Admin Account'}
          </p>
        </Card>
      </Col>
      <Col md={9}>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          <Tab eventKey="account" title="Account Settings">
            <h3>Update Account</h3>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated Successfully</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitAccountHandler}>
              <Form.Group controlId='email' className='mb-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password' className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter new password (leave blank to keep current)'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword' className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm new password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' variant='primary'>
                Update Account
              </Button>
            </Form>
          </Tab>

          {userInfo && userInfo.role === 'donor' && (
            <Tab eventKey="donorProfile" title="Donor Profile">
              <h3>Update Donor Profile</h3>
              {errorDonor && <Message variant='danger'>{errorDonor}</Message>}
              {successDonorUpdate && <Message variant='success'>Donor Profile Updated Successfully</Message>}
              {loadingDonor && <Loader />}
              <Form onSubmit={submitDonorProfileHandler}>
                <Form.Group controlId='donorName' className='mb-3'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter full name'
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='donorPhone' className='mb-3'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter phone number'
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='donorBloodType' className='mb-3'>
                  <Form.Label>Blood Type</Form.Label>
                  <Form.Select
                    value={donorBloodType}
                    onChange={(e) => setDonorBloodType(e.target.value)}
                    required
                  >
                    <option value=''>Select Blood Type</option>
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

                <Form.Group controlId='donorAvailabilityStatus' className='mb-3'>
                  <Form.Label>Availability Status</Form.Label>
                  <Form.Select
                    value={donorAvailabilityStatus}
                    onChange={(e) => setDonorAvailabilityStatus(e.target.value)}
                    required
                  >
                    <option value='available'>Available</option>
                    <option value='unavailable'>Unavailable</option>
                  </Form.Select>
                </Form.Group>

                <h4 className='mt-4'>Address</h4>

                <Form.Group controlId='donorStreet' className='mb-3'>
                  <Form.Label>Street Address (Optional)</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter street address'
                    value={donorStreet}
                    onChange={(e) => setDonorStreet(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId='donorCity' className='mb-3'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={donorCity}
                        onChange={(e) => setDonorCity(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='donorState' className='mb-3'>
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter state/province'
                        value={donorState}
                        onChange={(e) => setDonorState(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId='donorZipCode' className='mb-3'>
                      <Form.Label>Zip/Postal Code (Optional)</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter ZIP/postal code'
                        value={donorZipCode}
                        onChange={(e) => setDonorZipCode(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='donorCountry' className='mb-3'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={donorCountry}
                        onChange={(e) => setDonorCountry(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type='submit' variant='primary' className='mt-3'>
                  Update Donor Profile
                </Button>
              </Form>
            </Tab>
          )}

          {userInfo && userInfo.role === 'institution' && (
            <Tab eventKey="institutionProfile" title="Institution Profile">
              <h3>Update Institution Profile</h3>
              {errorInstitution && <Message variant='danger'>{errorInstitution}</Message>}
              {successInstitutionUpdate && <Message variant='success'>Institution Profile Updated Successfully</Message>}
              {loadingInstitution && <Loader />}
              <Form onSubmit={submitInstitutionProfileHandler}>
                <Form.Group controlId='instName' className='mb-3'>
                  <Form.Label>Institution Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter institution name'
                    value={instName}
                    onChange={(e) => setInstName(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instContactPerson' className='mb-3'>
                  <Form.Label>Contact Person</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter contact person name'
                    value={instContactPerson}
                    onChange={(e) => setInstContactPerson(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instPhone' className='mb-3'>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter phone number'
                    value={instPhone}
                    onChange={(e) => setInstPhone(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instDescription' className='mb-3'>
                  <Form.Label>Description (Optional)</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={3}
                    placeholder='Describe your institution'
                    value={instDescription}
                    onChange={(e) => setInstDescription(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='instOperatingHours' className='mb-3'>
                  <Form.Label>Operating Hours (Optional)</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='E.g., Mon-Fri: 9 AM - 5 PM'
                    value={instOperatingHours}
                    onChange={(e) => setInstOperatingHours(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <h4 className='mt-4'>Location</h4>

                <Form.Group controlId='instStreet' className='mb-3'>
                  <Form.Label>Street Address (Optional)</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter street address'
                    value={instStreet}
                    onChange={(e) => setInstStreet(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId='instCity' className='mb-3'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={instCity}
                        onChange={(e) => setInstCity(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='instState' className='mb-3'>
                      <Form.Label>State/Province</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter state/province'
                        value={instState}
                        onChange={(e) => setInstState(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId='instZipCode' className='mb-3'>
                      <Form.Label>Zip/Postal Code (Optional)</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter ZIP/postal code'
                        value={instZipCode}
                        onChange={(e) => setInstZipCode(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId='instCountry' className='mb-3'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={instCountry}
                        onChange={(e) => setInstCountry(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type='submit' variant='primary' className='mt-3'>
                  Update Institution Profile
                </Button>
              </Form>
            </Tab>
          )}
        </Tabs>
      </Col>
    </Row>
  );
};

export default ProfileScreen; 