import React from 'react';
import { Link } from "react-router-dom";

const NoPage = () => {
    return (
      <div className="app">
        <div className='centered-page'>
          You have entered a non-existent page<br />
          <Link to="/dashboard">Home</Link>
        </div>
      </div>
    );
}

export default NoPage