import { useState } from "react";

const ListUsers = () => {
  const data = [
    {
      id: 1,
      lastname: "Bello",
      othername: "Olakunle David",
      phone: "07047596287",
      email: "belloolakunledavid@gmail.com",
    },
  ];

  const [filter, setFilter] = useState("");

  // Handler for input change
  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) => {
    return (
      item.lastname.toLowerCase().includes(filter.toLowerCase()) ||
      item.othername.toLowerCase().includes(filter.toLowerCase()) ||
      item.email.toLowerCase().includes(filter.toLowerCase()) ||
      item.phone.toLowerCase().includes(filter.toLowerCase())
    );
  });

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
              <tr key={item.id}>
                <td>{item.id}</td>
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
