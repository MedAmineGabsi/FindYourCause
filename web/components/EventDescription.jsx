import React from 'react';
import { useParams } from "react-router";
import { useFindOne } from "@gadgetinc/react";
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { api } from "../api";
import './event.css';

const EventDescription = () =>{

  const { id } = useParams();
  const [{ data: event, fetching, error }] = useFindOne(api.event, id);

  if (fetching) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <div className="alert alert-danger" role="alert">
          Error loading event: {error.message}
        </div>
      </Container>
    );
  }
  
  if (!event) {
    return (
      <Container className="py-5">
        <div className="alert alert-warning" role="alert">
          Event not found
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="p-0" style={{width: "100vh"}}>
      <div className="event-hero">
        <Container className="event-hero__container" style={{width: "auto"}}>
          <Row style={{display: "flex"}}>
            <Col md={10}>
            <div className="event-hero__content" style={{width: "auto"}}>
            <h1 className="event-hero__title">{event.eventName}</h1>
            <p className="event-hero__organization">{event.organizationName}</p>
            {event.date && (
              <p className="event-hero__date">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
            {event.description && (
              <>
              <h3 style={{color : "#2074D4"}}>Description</h3>
              <p style={{marginBottom : "40px"}}>{event.description || 'No description available'}</p>
                <hr/>
              </>
            )}
          </div>
            </Col>
          <Col md={10}>
            <h2 style={{marginTop : "10px"}}>Event Details</h2>
            <p><strong>Address:</strong> {event.address || 'Location TBA'}</p>
            {event.url && (
              <p><strong>Website:</strong> <a href={event.url} target="_blank" rel="noopener noreferrer">{event.url}</a></p>
            )}
            <p><strong>Contact:</strong> {event.email}</p>
          </Col>
        </Row>
        </Container>
       </div>
    </Container>
  );
}

export default EventDescription;
