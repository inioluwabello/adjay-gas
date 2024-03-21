import { useState } from "react";
// import ReactCrop from "react-image-crop";
// import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

// import UploadPicture from './UploadPicture'


const apiBaseURL = `http://localhost:3001/api`;

const CreateUser = () => {
  const [input, setInput] = useState({
    lastname: "",
    othername: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = () => {
    const configuration = {
      method: "post",
      url: `${apiBaseURL}/users`,
      data: {...input, img: uploadedFileName }
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
        alert(
          error.message === "Request failed with status code 400"
            ? "This user already exists"
            : error.message
        );
      });
  };

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [uploadedFileName, setUploadedFileName] = useState();
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0]);
  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log(selectedFile);

      const response = await axios.post(`${apiBaseURL}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(`File uploaded successfully. Filename: ${response.data.filename}`);
      setUploadedFileName(response.data.filename)
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container main-wrapper">
      <h2 style={{ marginBottom: "1em" }}>Create User</h2>

      <div className="form-area">
        <h4 className="form-title">Account Information</h4>

        <div className="form-avatar-wrapper">
          <div className="form-avatar">
            {!file && <div className="form-avatar-content">
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
            </div>}

            {file && <img style={{width: "100px", height: "100px",borderRadius: "50px"}} src={file} alt="User" />}
          </div>

          <div className="form-avatar-buttons">
            <h5 style={{marginTop: "0"}}>Avatar</h5>
            <input 
              type="file" 
              name="avatar"
              id="avatar" onChange={handleChange} />
            
            {selectedFile && <button disabled={uploadedFileName !== undefined} className="btn btn-primary" onClick={handleUpload}>Upload Image</button>}
          </div>

        </div>
        <br />

        {/* Lastname, othername */}
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="John"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="othername" className="form-label">
                Other Names
              </label>
              <input
                type="text"
                className="form-control"
                id="othername"
                name="othername"
                placeholder="Doe"
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        {/* Email, Phone */}
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={handleInput}
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="2347047596287"
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="row">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="2"
              onChange={handleInput}
            ></textarea>
          </div>
        </div>

        {/* Gender, Date Of Birth */}
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                name="gender"
                aria-label="Default select example"
                onChange={handleInput}
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                placeholder="07047596287"
                onChange={handleInput}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mb-3">
            <button style={{float: "right"}} type="button" className="btn btn-primary" onClick={handleSubmitForm}>Create User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;