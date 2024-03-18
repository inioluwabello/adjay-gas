import React from 'react';
import { useAuth } from "../hooks/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();

  return (
    <div className="container">
      <div>
        <h1>Welcome! {auth.user?.username}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard