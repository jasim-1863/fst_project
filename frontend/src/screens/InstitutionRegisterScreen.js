import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createInstitutionProfile } from '../actions/institutionActions';

const InstitutionRegisterScreen = () => {
  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const institutionProfile = useSelector((state) => state.institutionProfile);
  const { loading, error, institution } = institutionProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userInfo.role !== 'institution') {
      navigate('/');
    } else if (institution && institution._id) {
      navigate('/institution/dashboard');
    }
  }, [navigate, userInfo, institution]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name || !contactPerson || !phone || !city || !state || !country) {
      setMessage('Please fill all required fields');
    } else {
      dispatch(
        createInstitutionProfile({
          name,
          contactPerson,
          phone,
          location: {
            street,
            city,
            state,
            zipCode,
            country,
          },
          description,
          operatingHours,
        })
      );
    }
  };

  return (
    <FormContainer>
      <h1>Complete Institution Registration</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label>Institution Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter institution name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='contactPerson' className='mb-3'>
          <Form.Label>Contact Person</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter contact person name'
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
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

        <Form.Group controlId='description' className='mb-3'>
          <Form.Label>Description (Optional)</Form.Label>
          <Form.Control
            as='textarea'
            rows={3}
            placeholder='Describe your institution'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='operatingHours' className='mb-3'>
          <Form.Label>Operating Hours (Optional)</Form.Label>
          <Form.Control
            type='text'
            placeholder='E.g., Mon-Fri: 9 AM - 5 PM'
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <h4 className='mt-4'>Location</h4>

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
          <Link to='/institution/dashboard'>Skip for now</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default InstitutionRegisterScreen; 