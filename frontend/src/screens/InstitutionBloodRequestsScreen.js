import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getInstitutionProfile, getInstitutionBloodRequests } from '../actions/institutionActions';

const InstitutionBloodRequestsScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const institutionProfile = useSelector((state) => state.institutionProfile);
  const { loading, error, institution } = institutionProfile;

  const bloodRequestList = useSelector((state) => state.bloodRequestList);
  const {
    loading: requestsLoading,
    error: requestsError,
    requests,
  } = bloodRequestList;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else if (userInfo.role !== 'institution') {
      navigate('/');
    } else {
      dispatch(getInstitutionProfile());
      dispatch(getInstitutionBloodRequests());
    }
  }, [dispatch, navigate, userInfo]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Open':
        return <Badge bg='primary'>Open</Badge>;
      case 'In Progress':
        return <Badge bg='warning'>In Progress</Badge>;
      case 'Fulfilled':
        return <Badge bg='success'>Fulfilled</Badge>;
      case 'Cancelled':
        return <Badge bg='secondary'>Cancelled</Badge>;
      default:
        return <Badge bg='secondary'>{status}</Badge>;
    }
  };

  const getUrgencyBadge = (urgency) => {
    switch(urgency) {
      case 'Critical':
        return <Badge bg='danger'>Critical</Badge>;
      case 'High':
        return <Badge bg='warning'>High</Badge>;
      case 'Medium':
        return <Badge bg='info'>Medium</Badge>;
      case 'Low':
        return <Badge bg='success'>Low</Badge>;
      default:
        return <Badge bg='secondary'>{urgency}</Badge>;
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Blood Requests Management</h1>
        </Col>
        <Col className='text-end'>
          <Link to='/institution/create-request'>
            <Button variant='primary'>
              <i className='fas fa-plus'></i> Create Blood Request
            </Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : institution && institution._id ? (
        <>
          <Card className="mb-4">
            <Card.Header as='h4'>All Blood Requests</Card.Header>
            <Card.Body>
              {requestsLoading ? (
                <Loader />
              ) : requestsError ? (
                <Message variant='danger'>{requestsError}</Message>
              ) : requests && requests.length === 0 ? (
                <Message>
                  No blood requests found. 
                  <Link to='/institution/create-request'>
                    <Button variant='link'>Create a new blood request</Button>
                  </Link>
                </Message>
              ) : (
                <Table striped responsive hover>
                  <thead>
                    <tr>
                      <th>Blood Type</th>
                      <th>Quantity</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Required By</th>
                      <th>Location</th>
                      <th>Respondents</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request._id}>
                        <td>
                          <Badge bg='danger'>{request.bloodType}</Badge>
                        </td>
                        <td>{request.quantity} units</td>
                        <td>{getUrgencyBadge(request.urgencyLevel)}</td>
                        <td>{getStatusBadge(request.status)}</td>
                        <td>
                          {request.requiredBy
                            ? new Date(request.requiredBy).toLocaleDateString()
                            : 'Not specified'}
                        </td>
                        <td>{request.location}</td>
                        <td>
                          {request.respondingDonors ? request.respondingDonors.length : 0}
                        </td>
                        <td>
                          <Button
                            variant='light'
                            size='sm'
                            className='btn-sm me-2'
                            onClick={() => navigate(`/blood-request/${request._id}`)}
                          >
                            <i className='fas fa-eye'></i>
                          </Button>
                          <Button
                            variant='light'
                            size='sm'
                            className='btn-sm'
                            onClick={() => navigate(`/institution/edit-request/${request._id}`)}
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

          <Row className="mb-4">
            <Col md={3}>
              <Card className="dashboard-card h-100">
                <Card.Body className="text-center">
                  <div className="dashboard-stat">
                    <div className="stat-value text-primary">{requests ? requests.length : 0}</div>
                    <div className="stat-label">Total Requests</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card h-100">
                <Card.Body className="text-center">
                  <div className="dashboard-stat">
                    <div className="stat-value text-success">{requests ? requests.filter(r => r.status === 'Fulfilled').length : 0}</div>
                    <div className="stat-label">Fulfilled</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card h-100">
                <Card.Body className="text-center">
                  <div className="dashboard-stat">
                    <div className="stat-value text-warning">{requests ? requests.filter(r => r.status === 'In Progress').length : 0}</div>
                    <div className="stat-label">In Progress</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="dashboard-card h-100">
                <Card.Body className="text-center">
                  <div className="dashboard-stat">
                    <div className="stat-value text-danger">{requests ? requests.filter(r => r.status === 'Open').length : 0}</div>
                    <div className="stat-label">Open</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message>
          Please complete your institution profile to access the blood requests. 
          <Link to='/institution/register'>
            <Button variant='link'>Complete Registration</Button>
          </Link>
        </Message>
      )}
    </>
  );
};

export default InstitutionBloodRequestsScreen; 