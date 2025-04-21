import React from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <>
      <h1>About Blood Donation</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header as="h3">Why Donate Blood?</Card.Header>
            <Card.Body>
              <p>
                Blood donation is a vital lifesaving process. Every day, blood donations help save the lives 
                of people who are in accidents, undergoing surgery, receiving treatment for cancer, and fighting other diseases.
              </p>
              <p>
                A single donation can save up to three lives. One unit of blood can be separated into several components: 
                red blood cells, plasma, and platelets, each with specific uses for patients in need.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">Eligibility Requirements</Card.Header>
            <Card.Body>
              <p>General requirements for blood donation include:</p>
              <ListGroup variant="flush">
                <ListGroup.Item>Being in good general health</ListGroup.Item>
                <ListGroup.Item>Being at least 17 years old in most states</ListGroup.Item>
                <ListGroup.Item>Weighing at least 110 pounds</ListGroup.Item>
                <ListGroup.Item>Having normal blood pressure, pulse, and temperature</ListGroup.Item>
                <ListGroup.Item>Having adequate hemoglobin levels</ListGroup.Item>
              </ListGroup>
              <p className="mt-3">
                There are also specific eligibility criteria related to medical conditions, medications,
                and travel history that may affect your ability to donate.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h3">Blood Types</Card.Header>
            <Card.Body>
              <p>There are 8 common blood types:</p>
              <ListGroup variant="flush">
                <ListGroup.Item>A+</ListGroup.Item>
                <ListGroup.Item>A-</ListGroup.Item>
                <ListGroup.Item>B+</ListGroup.Item>
                <ListGroup.Item>B-</ListGroup.Item>
                <ListGroup.Item>AB+</ListGroup.Item>
                <ListGroup.Item>AB-</ListGroup.Item>
                <ListGroup.Item>O+</ListGroup.Item>
                <ListGroup.Item>O-</ListGroup.Item>
              </ListGroup>
              <p className="mt-3">
                O- is the universal donor, while AB+ is the universal recipient.
              </p>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header as="h3">Donation Process</Card.Header>
            <Card.Body>
              <p>The blood donation process is simple and takes about an hour:</p>
              <ol>
                <li>Registration</li>
                <li>Medical history and mini-physical</li>
                <li>Donation (about 10 minutes)</li>
                <li>Refreshments and rest</li>
              </ol>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AboutScreen; 