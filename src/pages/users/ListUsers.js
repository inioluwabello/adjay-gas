import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// const apiBaseURL = `https://gn24cxww-3001.uks1.devtunnels.ms/api`;
const apiBaseURL = `http://localhost:3001/api`;
// const apiBaseURL = process.env.API_BASE_URL;

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("site");
    const configuration = {
      method: "get",
      url: `${apiBaseURL}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Call the API endpoint using Axios
    axios(configuration)
      .then(response => {
        // Update the state with the retrieved users
        setUsers(response.data);
      })
      .catch(error => {
        // Handle error if any
        console.error('Error fetching users:', error);
      });
  }, []);

  const [filter, setFilter] = useState("");

  // Handler for input change
  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = users.filter((item) => {
    return (
      item.lastname.toLowerCase().includes(filter.toLowerCase()) ||
      item.othername.toLowerCase().includes(filter.toLowerCase()) ||
      item.email.toLowerCase().includes(filter.toLowerCase()) ||
      item.phone.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const navigate = useNavigate();
  const fetchUseerDetails = (user) => {
    localStorage.setItem('userDetails', JSON.stringify(user));
    navigate('/user-details');
  }

  return (
    <div className="container main-wrapper">
      <div className="row">
        <div className="col-sm-6">
          <h2 className="row" style={{ marginBottom: "1em" }}>
            Users
          </h2>
        </div>
        <div className="col-sm-6">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type here to search"
              aria-label="Search"
              aria-describedby="Search-control"
              value={filter}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="form-area">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id} style={{cursor: "pointer"}} onClick={() => fetchUseerDetails(item)}>
                <td>{item._id}</td>
                <td>
                  {item.lastname}&nbsp;{item.othername}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUsers;
