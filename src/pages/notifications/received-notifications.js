import { useState, useEffect } from "react";
import axios from "axios";
import TimeAgo from 'react-timeago'

const apiBaseURL = `http://localhost:3001/api`;

const ReceivedNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("site");
    const configuration = {
      method: "get",
      url: `${apiBaseURL}/notification`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Call the API endpoint using Axios
    axios(configuration)
      .then((response) => {
        // Update the state with the retrieved notifications
        setNotifications(response.data);
      })
      .catch((error) => {
        // Handle error if any
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const [currentNotification, setCurrentNotification] = useState(null);
  const displayNotificationItem = (notification) => {
    if (notification.recipient !== "all") {
      getRecipientDetails(notification.recipient);
    }
    setCurrentNotification(notification);
  };

  const [recipient, setRecipient] = useState({});
  const getRecipientDetails = (userId) => {
    const token = localStorage.getItem("site");
    const configuration = {
      method: "get",
      url: `${apiBaseURL}/users/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Call the API endpoint using Axios
    axios(configuration)
      .then((response) => {
        setRecipient(response.data);
      })
      .catch((error) => {
        // Handle error if any
        console.error("Error fetching recipient details:", error);
      });
  };
  return (
    <div className="container main-wrapper">
      <h2 style={{ marginBottom: "1em" }}>Notifications</h2>
      <h4 className="form-title">All Messages</h4>
      <div className="notifications-wrapper">
        <div className="notification-pane">
          {notifications.map((item) => (
            <div
              className="notification-item"
              key={item._id}
              onClick={() => displayNotificationItem(item)}
            >
              <h6 className="notification-title">{item.title}</h6>
              <div className="notification-message">
                {item.message.length > 35
                  ? item.message.slice(0, 35) + "..."
                  : item.message}
              </div>
            </div>
          ))}
        </div>
        {currentNotification && (
          <div className="message-area">
            <h6>
              To:{" "}
              {currentNotification.recipient === "all"
                ? "All"
                : `${recipient.lastname} ${recipient.othername}`}
            </h6>

            <div className="relative">
              <i className="absolute" style={{right: 0, top: "-29px"}}>
                <TimeAgo date={currentNotification.time} />
              </i>
            </div>
            <hr />

            <div className="message-content">{currentNotification.message}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceivedNotifications;
