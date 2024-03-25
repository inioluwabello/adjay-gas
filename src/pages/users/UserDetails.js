import  { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const UserDetails = () => {
  const apiBaseURL = `http://localhost:3001/api`;

  const [imageData, setImageData] = useState(null);
  const [user, setUser] = useState(null); // State to store the image name

  useEffect(() => {
    const fetchImage = async (name) => {
      try {
        const response = await fetch(`${apiBaseURL}/image/${name}`);
        if (!response.ok) {
          throw new Error("Image not found");
        }
        const data = await response.blob();
        setImageData(URL.createObjectURL(data));
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    const user = JSON.parse(localStorage.getItem("userDetails"));
    setUser(user);

    // Fetch the image data when the component mounts
    fetchImage(user.img); // Set the initial image name here
  }, [apiBaseURL]);

  return (
    <div className="container">
      <div className="return-link">
        <Link to={"/list-users"} style={{ textDecoration: "none" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 256 256"
            font-size="var(--icon-fontSize-md)"
          >
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
          &nbsp;&nbsp;User List
        </Link>
      </div>

      <div className="row" style={{ marginTop: "1em" }}>
        <div className="mb-3">
          <h2 className="" style={{ marginBottom: "1em" }}>
            User Details
          </h2>
        </div>
      </div>

      <div className="form-area" style={{paddingTop: "2em"}}>
        <div className="form-avatar-wrapper">
          <div className="form-avatar">
            {!imageData && (
              <div className="form-avatar-content">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  fontSize="22px"
                >
                  <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></path>
                </svg>
              </div>
            )}

            {imageData && (
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50px",
                }}
                src={imageData}
                alt="User"
              />
            )}
          </div>

          <div className="user-details" style={{ width: "calc(100% - 126px)" }}>
            {user && (
              <table class="table table-success table-striped">
                <tbody>
                  <tr>
                    <th scope="row" className='text-right'>User Id</th>
                    <td>{user._id}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Last Name</th>
                    <td>{user.lastname}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Other Name</th>
                    <td>{user.othername}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Email</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Phone Number</th>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Gender</th>
                    <td>{user.gender}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Date of Birth</th>
                    <td>{user.dob}</td>
                  </tr>
                  <tr>
                    <th scope="row" className='text-right'>Address</th>
                    <td>{user.address}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
