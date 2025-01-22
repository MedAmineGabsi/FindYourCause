import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { Card, CardContent, Grid, Typography, Container, Skeleton } from "@mui/material";
import React from "react";
import { Link } from 'react-router'
import './Events.css';

// Helper function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
 
// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
 
const Events = () => {
  const [{ data, fetching, error }] = useFindMany(api.event, {
    sort: { date: "Descending" },
    select: {
      id: true,
      eventName: true,
      organizationName: true,
      date: true,
      description: true
    }
  });
 
  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error" variant="h6">
          Error loading events: {error.message}
        </Typography>
      </Container>
    );
  }

  if(fetching){
    return <div class="loader"></div>
  }
  
  return (
    <>
    <Container 
      sx={{ 
        py: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "calc(1173px - 100vh + 10rem)",
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {data && data.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}
            >
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>{event.eventName}</Typography>
                <Typography color="textSecondary" gutterBottom>{event.organizationName}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>{formatDate(event.date)}</Typography>
                <Typography variant="body2">
                  {truncateText(event.description, 100)}
                </Typography>
                <br/>
                <button className="submit-button"><Link to={`/event/${event.id}`} style={{textDecoration: 'none', color: "white"}}>See More details</Link></button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
      );
};
 
export default Events;