import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { createBloodRequest } from '../actions/institutionActions';
import { BLOOD_REQUEST_CREATE_RESET } from '../constants/institutionConstants';

const CreateBloodRequestScreen = () => {
  const [bloodType, setBloodType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [urgencyLevel, setUrgencyLevel] = useState('Medium');
  const [requiredByDate, setRequiredByDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [minDate, setMinDate] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bloodRequestCreate = useSelector((state) => state.bloodRequestCreate);
  const { loading, error, success, request } = bloodRequestCreate;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'institution') {
      navigate('/login');
    }

    if (success) {
      dispatch({ type: BLOOD_REQUEST_CREATE_RESET });
      navigate('/institution/blood-requests');
    }

    // Set minimum date for required date to today
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    setMinDate(formattedDate);
  }, [dispatch, navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBloodRequest({
        bloodType,
        quantity,
        urgencyLevel,
        requiredBy: requiredByDate || null,
        location,
        description,
      })
    );
  };

  return (
    <>
      <Link to='/institution/dashboard' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Blood Request</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='bloodType' className='mb-3'>
              <Form.Label>Blood Type Required</Form.Label>
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
                <option value='Any'>Any</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='quantity' className='mb-3'>
              <Form.Label>Quantity (Units)</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min='1'
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='urgencyLevel' className='mb-3'>
              <Form.Label>Urgency Level</Form.Label>
              <Form.Select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                required
              >
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
                <option value='Critical'>Critical</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='requiredByDate' className='mb-3'>
              <Form.Label>Required By (Optional)</Form.Label>
              <Form.Control
                type='date'
                value={requiredByDate}
                onChange={(e) => setRequiredByDate(e.target.value)}
                min={minDate}
              ></Form.Control>
              <Form.Text className='text-muted'>
                Leave blank if needed as soon as possible
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='location' className='mb-3'>
              <Form.Label>Donation Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter the location where donors should come'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='mb-3'>
              <Form.Label>Description (Optional)</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Provide additional details about this blood request'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>
              Create Request
            </Button>
          </Form>
        )}
      </FormContainer>

      <Row className='mt-5'>
        <Col md={12}>
          <Card>
            <Card.Header as='h4'>Blood Request Guidelines</Card.Header>
            <Card.Body>
              <p>
                When creating a blood request, please keep in mind the following guidelines:
              </p>
              <ul>
                <li>Be specific about the required blood type</li>
                <li>Set an appropriate urgency level based on your actual needs</li>
                <li>Provide clear instructions about the donation location</li>
                <li>
                  Include any specific requirements or conditions in the description
                </li>
                <li>
                  Respond promptly to donors who express interest in your request
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBloodRequestScreen; 