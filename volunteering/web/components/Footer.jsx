import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

const Footer = () =>{
  return (
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <div className='text-center p-3' style={{ backgroundColor: '#2074D4'}}>
        © 2025 Copyright:<a className='text-white' href='' style={{textDecoration: "none"}}> Find Your Cause </a>
      </div>
    </MDBFooter>)
}

export default Footer;