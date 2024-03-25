import React from 'react';
// import { useAuth } from "../hooks/AuthProvider";

const Dashboard = () => {
  // const auth = useAuth();
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="container">
      <div className='main' style={{padding: "2em"}}>
        <h1>Welcome {user.lastname || ""}!</h1>
      </div>
    </div>
  );
}

export default Dashboard