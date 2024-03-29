import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import Logo from "./Logo"
import DefaultAvatar from "./DefaultAvatar"

const LeftPane = ({ toggleLeftPaneVisibility }) => {
  const auth = useAuth();
  const apiBaseURL = `http://localhost:3001/api`;

  const [userDropOpened, setUserDropOpened] = useState(false);
  const [nottificationDropOpened, setNottificationDropOpened] = useState(false);
  const handleMenuClick = (status, itemClickHandler) => {
    itemClickHandler(status);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
    fetchImage(user.img);
  }, [])

  const navigate = useNavigate();
  const [imageData, setImageData] = useState(null);
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

  return (
    <div className="left-pane-content p2">
      <Logo />

      <div className="user-box">
        <div className="avatar">
          {!imageData && <DefaultAvatar />}
          {imageData && (
            <img src={imageData} alt="User" style={{ width: "100%" }} />
          )}
        </div>
        <div className="user-info">
          <div className="workspace">Workspace</div>
          <div className="user-name">{user.lastname}</div>
        </div>
      </div>

      <div className="main-nav">
        <div
          className="nav-item"
          onClick={() => { 
            navigate("/dashboard")
            if (toggleLeftPaneVisibility) {
              toggleLeftPaneVisibility();
            }
          }}
        >
          <div className="nav-item-icon">
            <svg
              style={{ width: "1.5em", height: "1.5em", marginTop: "-4px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="#b3b9c6"
              viewBox="0 0 256 256"
              fontSize="16px"
            >
              <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
            </svg>
          </div>

          <div className="nav-item-description">Dashboard</div>
        </div>

        {/* Nav Item Start */}
        <div
          className="nav-item"
          onClick={() => 
            handleMenuClick(!userDropOpened, setUserDropOpened)
            }
        >
          <div className="nav-item-icon">
            <svg
              style={{ width: "1.5em", height: "1.5em", marginTop: "-4px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="1.3em"
              height="1.3em"
              fill="#b3b9c6"
              viewBox="0 0 256 256"
              fontSize="16px"
            >
              <path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"></path>
            </svg>
          </div>

          <div className="nav-item-description">Users</div>

          <div className="caret">
            {!userDropOpened && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="#8a94a6"
                viewBox="0 0 256 256"
                fontSize="16px"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            )}

            {userDropOpened && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="#8a94a6"
                viewBox="0 0 256 256"
                fontSize="16px"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            )}
          </div>
        </div>
        {userDropOpened && (
          <div className="nav-item-options">
            <div className="option-item">
              <Link className="nav-a" onClick={() => {
                if (toggleLeftPaneVisibility) {
                  toggleLeftPaneVisibility();
                }
              }} to={"/list-users"}>
                List Users
              </Link>
            </div>
            <div className="option-item">
              <Link className="nav-a" onClick={() => {
                if (toggleLeftPaneVisibility) {
                  toggleLeftPaneVisibility();
                }
              }} to={"/create-user"}>
                Create User
              </Link>
            </div>
          </div>
        )}
        {/* Nav Item End */}

        {/* Nav Item Start */}
        <div
          className="nav-item"
          onClick={() =>
            handleMenuClick(
              !nottificationDropOpened,
              setNottificationDropOpened
            )
          }
        >
          <div className="nav-item-icon">
            <svg
              className="notification-bell"
              style={{ width: "1.5em", height: "1.5em", marginTop: "-4px" }}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="#b3b9c6"
              viewBox="0 0 256 256"
            >
              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
            </svg>
          </div>

          <div className="nav-item-description">Notifications</div>

          <div className="caret">
            {!nottificationDropOpened && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="#8a94a6"
                viewBox="0 0 256 256"
                fontSize="16px"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            )}

            {nottificationDropOpened && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="#8a94a6"
                viewBox="0 0 256 256"
                fontSize="16px"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
              </svg>
            )}
          </div>
        </div>
        {nottificationDropOpened && (
          <div className="nav-item-options">
            <div className="option-item">
              <Link className="nav-a" onClick={() => {
                if (toggleLeftPaneVisibility) {
                  toggleLeftPaneVisibility();
                }
              }} to={"/received-notifications"}>
                All Items
              </Link>
            </div>
            <div className="option-item">
              <Link className="nav-a" onClick={() => {
                if (toggleLeftPaneVisibility) {
                  toggleLeftPaneVisibility();
                }
              }} to={"/send-notifications"}>
                Send Item
              </Link>
            </div>
          </div>
        )}
        <div className="nav-item" onClick={() => auth.logOut()}>
          <div className="nav-item-icon text-danger">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 256 256"
              fontSize="22px"
            >
              <path d="M112,216a8,8,0,0,1-8,8H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h56a8,8,0,0,1,0,16H48V208h56A8,8,0,0,1,112,216Zm109.66-93.66-40-40a8,8,0,0,0-11.32,11.32L196.69,120H104a8,8,0,0,0,0,16h92.69l-26.35,26.34a8,8,0,0,0,11.32,11.32l40-40A8,8,0,0,0,221.66,122.34Z"></path>
            </svg>
          </div>
          <div className="nav-item-description text-danger">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default LeftPane;
