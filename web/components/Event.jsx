import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './event.css';

const Event = () => {
  const sampleEvent = {
    eventName: "Help Save the Turtles!",
    organizationName: "Kaiyan's Turtle Org",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi iste provident ad aliquid repudiandae harum quod temporibus quia. Amet quos harum, officiis, temporibus neque explicabo mollitia a dicta assumenda animi aliquid reprehenderit et labore placeat.",
    date: new Date("2024-04-15T09:00:00"),
    email: "example@gmail.com",
    url: "www.abcdef"
  };

  return (
    <>
      <div className="left-right">
        <div className="card-container">
            <header className="event-hero py-5 mb-5">
            <Container>
              <Row className="event-hero__container justify-content-center align-items-center">
                <Col className="event-hero__content text-center">
                  <h1 className="display-3 event-hero__title mb-3">
                    {sampleEvent.eventName}
                  </h1>
                    <h2 className="h4 mb-3 text-primary">Organized By</h2>
                    <p className="h5 fw-bold mb-0">{sampleEvent.organizationName}</p>
                  <p className="lead event-hero__date">
                    {sampleEvent.date.toLocaleDateString(undefined, { 
                      weekday: 'long',
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </Col>
              </Row>
            </Container>
          </header>
        </div>

        <div className="card-container">
            <header className="event-hero py-5 mb-5" aria-label="Event header">
            <Container>
              <Row className="event-hero__container">
                <Col className="event-hero__content">
                  <h1 className="display-3 event-hero__title mb-3">
                    About this Event
                  </h1>
                    <p className="lead">{sampleEvent.description}</p>
                </Col>
                <Col className="d-flex flex-column">
                    <h3 className="h4 mb-4">Contact Information</h3>
                   
                  
                    <p className="mb-3">
                      <strong>Email:</strong>{' '}
                      <a href={`mailto:${sampleEvent.email}`} className="text-decoration-none">
                        {sampleEvent.email}
                      </a>
                    </p>
                    
                    <p className="mb-3">
                      <strong>Website:</strong>{' '}
                      <a 
                        href={sampleEvent.url} 
                        className="text-decoration-none" 
                        target="_blank" 
                        rel="noopener noreferrer">Visit Event Website</a>
                    </p>
                    <button className="btn btn-primary btn-lg event-hero__register">Save</button>
                </Col>
              </Row>
            </Container>
          </header>
      
        </div>

      
      </div>


    </>
  );
};
export default Event;
