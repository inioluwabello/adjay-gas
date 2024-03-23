import { useState, useEffect } from "react";
import axios from "axios";

const apiBaseURL = `http://localhost:3001/api`;

const CreateNotification = () => {
  // Load users
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
      .then((response) => {
        // Update the state with the retrieved users
        setUsers(response.data);
      })
      .catch((error) => {
        // Handle error if any
        console.error("Error fetching users:", error);
      });
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  const [input, setInput] = useState({
    message: "",
    recipient: "",
    title: "",
    sender: user._id,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [filter, setFilter] = useState("");

  // Handler for input change
  const handleInputChange = (e) => {
    setFilter(e.target.value);
    setRecipientSet(false)
  };

  const filteredData = users.filter((item) => {
    return (
      item.lastname.toLowerCase().includes(filter.toLowerCase()) ||
      item.othername.toLowerCase().includes(filter.toLowerCase()) ||
      item.email.toLowerCase().includes(filter.toLowerCase()) ||
      item.phone.toLowerCase().includes(filter.toLowerCase())
    );
  });


  const [recipientSet, setRecipientSet] = useState(false);
  const setRecipient = (user) => {
    setRecipientSet(true)
    if (user === "all") {
      setFilter("Sending To All");
      setInput((prev) => ({
        ...prev,
        recipient: "all",
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        recipient: user._id,
      }));
      setFilter(`${user.lastname} ${user.othername}`);
    }
  };

  const handleSubmitForm = () => {

    if (input.title === "") {
        alert('Please provide a title');
        return;
    }

    if (input.message === "") {
        alert('Please enter a message');
        return;
    }

    const token = localStorage.getItem("site");
    const configuration = {
      method: "post",
      url: `${apiBaseURL}/notification`,
      data: { ...input, time: Date.now() },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        console.log(result);
        alert(result.data.message);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <div className="container main-wrapper">
      <h2 style={{ marginBottom: "1em" }}>Create Notification</h2>

      <div className="form-area">
        <h4 className="form-title">New Message</h4>

        <div className="row">
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search User
            </label>
            <input
              type="text"
              className="form-control"
              id="search"
              name="search"
              placeholder="Type surname or other names to search"
              value={filter}
              onChange={handleInputChange}
            />
            {!recipientSet && filter && (
              <div className="relative">
                <div className="absolute abs-user-list">
                  <ul>
                    <li
                      style={{ cursor: "pointer" }}
                      onClick={() => setRecipient("all")}
                    >
                      Send to all
                    </li>
                    {filteredData.map((item) => (
                      <li
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => setRecipient(item)}
                      >
                        {item.lastname}&nbsp;{item.othername}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="row">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Message Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Enter Message Title"
                onChange={handleInput}
              />
            </div>
        </div>

        <div className="row">
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              rows="5"
              onChange={handleInput}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="mb-3">
            <button
              style={{ float: "right" }}
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitForm}
            //   disabled={input.title === "" || input.message === ""}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotification;
