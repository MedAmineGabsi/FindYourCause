import { useAction } from "@gadgetinc/react";
import { api } from "../api";
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const fetchLatLong = async (address) => {
  const apiKey = "AIzaSyCbfTJUnQHrGKeqSnN5SO4DkBmbW4xQyx0";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error("Geocoding error:", data.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocode:", error);
    return null;
  }
};

export default function SubmitEventForm() {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [locationError, setLocationError] = useState();
  const libraries = ['places'];
  const mapContainerStyle = {
    width: '100px',
    height: '100px',
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const successFn = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const errorFn = (error) => {
      setLocationError(error.message);
    };

    geolocation.getCurrentPosition(successFn, errorFn);
  }, []);

  const [{ error, fetching }, createEvent] = useAction(api.event.create);
  
  const [formData, setFormData] = useState({
    eventName: "",
    organizationName: "",
    email: "",
    description: "",
    date: "",
    url: "",
    address: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    
    // If the address field changed, fetch coordinates
    if (name === "address") {
      const coordinates = await fetchLatLong(value);
      if (coordinates) {
        setLatitude(coordinates.lat);
        setLongitude(coordinates.lng);
      }
    }
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submissionData = { ...formData };
      
      // Only include date if it has a value, and convert to ISO string
      if (submissionData.date) {
        submissionData.date = new Date(submissionData.date).toISOString();
      } else {
        delete submissionData.date;
      }

      submissionData.latitude = latitude;
      submissionData.longitude = longitude;
      await createEvent(submissionData);
      
      // Clear form after successful submission
      setFormData({
        eventName: "",
        organizationName: "",
        email: "",
        description: "",
        date: "",
        url: "",
      });
      // You might want to show a success message or redirect
    } catch (err) {
      // Error handling is already captured in the error state from useAction
    }
  };

  return (
    <Container style={{paddingTop: '3rem', paddingBottom: '3rem', marginBottom: '3rem', marginTop: 'calc(817px - 100vh + 10rem)'}}>
      <Row>
        <Col>
          <h2>Submit Your Event</h2>
          <Form onSubmit={handleSubmit} style={{height: 'auto', overflow: 'auto'}}>
            <Form.Group className="mb-2">
              <Form.Label>Event Name *</Form.Label>
              <Form.Control
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Organization Name *</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="https://"
              />
            </Form.Group>

            {error && (
              <div className="alert alert-danger">
                Error: {error.message}
              </div>
            )}

            <Button 
              variant="primary" 
              type="submit" 
              disabled={fetching}
            >
              {fetching ? "Submitting..." : "Submit Event"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
