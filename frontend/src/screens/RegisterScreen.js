import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === 'donor') {
        navigate('/donor/register');
      } else if (userInfo.role === 'institution') {
        navigate('/institution/register');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(email, password, role));
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='role' className='mb-3'>
          <Form.Label>I want to register as a:</Form.Label>
          <Row>
            <Col md={6}>
              <Card 
                className={`mb-3 ${role === 'donor' ? 'border-danger' : ''}`} 
                onClick={() => setRole('donor')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <Form.Check
                    type='radio'
                    label='Blood Donor'
                    id='roleDonor'
                    name='role'
                    value='donor'
                    checked={role === 'donor'}
                    onChange={(e) => setRole(e.target.value)}
                    className='mb-2'
                  />
                  <small>
                    Register as a donor to donate blood and help save lives
                  </small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card 
                className={`mb-3 ${role === 'institution' ? 'border-danger' : ''}`} 
                onClick={() => setRole('institution')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body>
                  <Form.Check
                    type='radio'
                    label='Medical Institution'
                    id='roleInstitution'
                    name='role'
                    value='institution'
                    checked={role === 'institution'}
                    onChange={(e) => setRole(e.target.value)}
                    className='mb-2'
                  />
                  <small>
                    Register as a medical institution to request blood donations
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId='email' className='mb-3'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword' className='mb-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mb-3'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen; 