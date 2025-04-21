import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createDonorProfile } from '../actions/donorActions';

const DonorRegisterScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const donorProfile = useSelector((state) => state.donorProfile);
  const { loading, error, donor } = donorProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userInfo.role !== 'donor') {
      navigate('/');
    } else if (donor && donor._id) {
      navigate('/donor/dashboard');
    }
  }, [navigate, userInfo, donor]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!bloodType || !name || !phone || !city || !state || !country) {
      setMessage('Please fill all required fields');
    } else {
      dispatch(
        createDonorProfile({
          name,
          phone,
          bloodType,
          address: {
            street,
            city,
            state,
            zipCode,
            country,
          },
        })
      );
    }
  };

  return (
    <FormContainer>
      <h1>Complete Donor Registration</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter full name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='phone' className='mb-3'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='bloodType' className='mb-3'>
          <Form.Label>Blood Type</Form.Label>
          <Form.Select
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value)}
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

        <Form.Group controlId='street' className='mb-3'>
          <Form.Label>Street Address (Optional)</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter street address'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId='city' className='mb-3'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='state' className='mb-3'>
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter state/province'
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId='zipCode' className='mb-3'>
              <Form.Label>Zip/Postal Code (Optional)</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter ZIP/postal code'
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId='country' className='mb-3'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type='submit' variant='primary' className='mt-3'>
          Complete Registration
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          <Link to='/donor/dashboard'>Skip for now</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default DonorRegisterScreen; 