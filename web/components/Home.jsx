import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Mapy from './Map.jsx'
import {api} from '../api.js'
import {Link} from 'react-router'
import { useFindMany } from "@gadgetinc/react";
import { Card, CardContent, Grid, Typography, Container, Skeleton } from "@mui/material";
import './Home.css';
import Image1 from './images/image1.jpg'
import Image2 from './images/image2.jpg'
import Image3 from './images/image3.jpg'
import Events from './Events.jsx'
import Footer from './Footer.jsx'

const Home = () =>{

  const [{ data: events, fetching, error }] = useFindMany(api.event)

  const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
  
  return(
    <div className= "home-box">
      <div style={{marginTop:"30px"}}></div>
         <Carousel data-bs-theme="light" fade={true} controls={false} interval={1200} indicators={false} className="carousel-container">
      <Carousel.Item>
        
        <img
          className="d-block w-100"
          src={Image1}
          alt="First slide"
        />
        <Carousel.Caption className="text">
          <h5>Volunteer</h5>
          <p>Fueling Lives, One Meal at a Time.</p>
        </Carousel.Caption>
      </Carousel.Item>
           
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image2}
          alt="Second slide"
        />
        <Carousel.Caption className="text">
          <h5>Volunteer</h5>
          <p>Protect the Planet, Preserve Tomorrow.</p>
        </Carousel.Caption>
      </Carousel.Item>
           
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Image3}
          alt="Third slide"
        />
        <Carousel.Caption className="text">
          <h5>Volunteer</h5>
          <p>Empower Minds, Change Lives.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      
      <div className='home-container'>
        <div className="events-section"> 
            <div className = "events">
            {events && events.map((event) => (
            <Card 
              sx={{ 
                height: '100%',
                width: "60vh",
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
              style={{margin: "20px"}}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>{event.eventName}</Typography>
                <Typography color="textSecondary" gutterBottom>{event.organizationName}</Typography>
                <Typography variant="body2">
                  {truncateText(event.description, 100)}
                </Typography>
                <br/>
                <button className="submit-button"><Link to={`/event/${event.id}`} style={{textDecoration: 'none', color: "white"}}>See More details</Link></button>
              </CardContent>
            </Card>
        ))}
            </div>
          
            </div>
              <Mapy className="map"/>
           </div>
          <Footer/>
    </div>

    
      

     
       

   )
}

export default Home
