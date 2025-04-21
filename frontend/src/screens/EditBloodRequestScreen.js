import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getBloodRequestById, updateBloodRequest } from '../actions/institutionActions';
import { INSTITUTION_UPDATE_BLOOD_REQUEST_RESET } from '../constants/institutionConstants';
import { format } from 'date-fns';

const EditBloodRequestScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [bloodType, setBloodType] = useState('');
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [requiredDate, setRequiredDate] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [patientDescription, setPatientDescription] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [location, setLocation] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bloodRequestDetails = useSelector((state) => state.bloodRequestDetails);
  const { loading, error, bloodRequest } = bloodRequestDetails;

  const bloodRequestUpdate = useSelector((state) => state.bloodRequestUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bloodRequestUpdate;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'institution') {
      navigate('/login');
      return;
    }

    if (successUpdate) {
      dispatch({ type: INSTITUTION_UPDATE_BLOOD_REQUEST_RESET });
      navigate('/institution/blood-requests');
    } else {
      if (!bloodRequest || !bloodRequest._id || bloodRequest._id !== id) {
        dispatch(getBloodRequestById(id));
      } else {
        setBloodType(bloodRequest.bloodType);
        setUnitsNeeded(bloodRequest.unitsNeeded);
        setRequiredDate(bloodRequest.requiredDate.substring(0, 10));
        setUrgency(bloodRequest.urgency);
        setPatientDescription(bloodRequest.patientDescription || '');
        setAdditionalNotes(bloodRequest.additionalNotes || '');
        setLocation(bloodRequest.location || '');
      }
    }
  }, [dispatch, navigate, userInfo, id, bloodRequest, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(
      updateBloodRequest({
        _id: id,
        bloodType,
        unitsNeeded,
        requiredDate,
        urgency,
        patientDescription,
        additionalNotes,
        location,
      })
    );
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return format(d, 'yyyy-MM-dd');
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <>
      <Link to='/institution/blood-requests' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Blood Request</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <Form.Group controlId='unitsNeeded' className='mb-3'>
                  <Form.Label>Units Needed</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter units needed'
                    value={unitsNeeded}
                    onChange={(e) => setUnitsNeeded(e.target.value)}
                    min='1'
                    max='10'
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId='requiredDate' className='mb-3'>
                  <Form.Label>Required By Date</Form.Label>
                  <Form.Control
                    type='date'
                    value={formatDate(requiredDate)}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    min={formatDate(today)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId='urgency' className='mb-3'>
                  <Form.Label>Urgency Level</Form.Label>
                  <Form.Select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    required
                  >
                    <option value='Critical'>Critical</option>
                    <option value='High'>High</option>
                    <option value='Medium'>Medium</option>
                    <option value='Low'>Low</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId='location' className='mb-3'>
              <Form.Label>Donation Location</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter donation location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <Form.Text className='text-muted'>
                Specific location where donors should come to donate (e.g., Room 101, Blood Bank Section)
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='patientDescription' className='mb-3'>
              <Form.Label>Patient Description</Form.Label>
              <Form.Control
                as='textarea'
                rows={2}
                placeholder='Brief description of patient situation (optional)'
                value={patientDescription}
                onChange={(e) => setPatientDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='additionalNotes' className='mb-3'>
              <Form.Label>Additional Notes</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Any additional information for donors (optional)'
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3' disabled={loadingUpdate}>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditBloodRequestScreen; 