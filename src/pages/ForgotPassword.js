import { useState } from "react";
// import { useAuth } from "../hooks/AuthProvider";
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  const [input, setInput] = useState({
    email: "",
  });

  
  // const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.email !== "") {
      // Call api here
      return;
    }
    alert("Please provide a valid email");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-wrapper">

      <div className="form-content">
        
        <div style={{textAlign: "center"}}>
          <svg
            version="1.1"
            x="0px"
            y="0px"
            width="100%"
            viewBox="0 0 54 58"
            enableBackground="new 0 0 54 58"
            style={{width: "40px"}}
          >
            <path
              fill="none"
              opacity="1.000000"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3.000000"
              d="
M35.500000,39.000000 
	C37.500000,39.166668 39.498325,39.357834 41.500359,39.494770 
	C45.358070,39.758633 47.325436,38.195995 47.470535,34.498844 
	C47.607693,31.004227 47.536320,27.499386 47.477070,24.000389 
	C47.460094,22.997854 47.499554,21.735023 46.947647,21.041674 
	C42.285568,15.184792 35.563644,12.447260 28.995373,9.510347 
	C27.608377,8.890171 26.543297,10.132973 25.550787,10.606458 
	C21.922428,12.337395 18.436470,14.398111 15.018318,16.529379 
	C11.764133,18.558409 9.725540,21.281050 10.467447,25.505716 
	C11.279385,30.129166 9.237704,34.961544 11.939120,39.535954 
	C15.182350,45.027824 20.947939,46.492172 26.080963,48.821594 
	C27.497555,49.464455 30.072773,48.318451 31.019003,46.007782 
	C31.990282,43.635952 33.070492,41.299789 35.000000,39.500000 
"
            />
            <path
              fill="none"
              opacity="1.000000"
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3.000000"
              d="
M35.000000,39.000000 
	C34.456612,33.375610 32.742359,28.166691 29.511700,22.916565 
	C22.564577,27.275127 17.993961,33.643913 12.500000,39.000000 
"
            />
          </svg> 
        </div>
        

        <form onSubmit={handleSubmitEvent}>

          <h2>Forgot Password</h2>

          <div className="form_control">
            <label htmlFor="user-email">Email:</label>
            <input
              type="email"
              id="username"
              name="username"
              placeholder="example@yahoo.com"
              aria-describedby="username"
              aria-invalid="false"
              onChange={handleInput}
            />
          </div>
          <button className="btn btn-pry btn-submit w-100">Request Password Reset</button>
          <br />

          <div><Link className="forgot-password" to={"/login"}>Login</Link></div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;