import React, {useState, useEffect} from 'react';
import {api} from '../api';
import { useFindMany } from "@gadgetinc/react";
import { GoogleMap, LoadScript, useLoadScript, Marker } from '@react-google-maps/api';

const Mapy = () =>{
      const [latitude, setLatitude] = useState()
      const [longitude, setLongitude] = useState()
      const [locationError, setLocationError] = useState();
      const libraries = ['places'];
      const mapContainerStyle = {
        width: '600px',
        height: '500px',
        borderRadius: "10px"
      };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const successFn = (position) => {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    };

    const errorFn = (error) => {
      setLocationError(error.message)
      
    };

    geolocation.getCurrentPosition(successFn, errorFn);
    
  }, []);

  useEffect(() => {
    // Debug state changes
    console.log(latitude)
    console.log(longitude)
  }, [latitude, longitude, locationError]); 

  const [{ data: events, fetching, error }] = useFindMany(api.event)
  return(
    <>
      <LoadScript googleMapsApiKey="key">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={{lat: latitude, lng: longitude }}
      >
        {latitude && longitude && <Marker position={{ lat: latitude, lng: longitude}} icon={{url: 
          "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png", // Custom icon URL
        }}/>}
        {events && events.map((marker) => (
        <Marker
          key={marker.id}
          position={{lat: marker.latitude, lng: marker.longitude}}
          onClick={() => {
            alert(`This is the: ${marker.eventName} event`);
          }}
        />
      ))}

      </GoogleMap>
      </LoadScript>
    </>
  )
};

export default Mapy;
