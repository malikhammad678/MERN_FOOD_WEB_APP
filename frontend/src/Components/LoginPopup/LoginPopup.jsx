import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/Context';
import axios from 'axios';

const LoginPopup = ({ setpopup }) => {
  const [currState, setCurrState] = useState("Login");
  const { url } = useContext(StoreContext);
  const { token, setToken } = useContext(StoreContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "app/user/login";
    } else {
      newUrl += "app/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setpopup(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("There was an error logging in or registering!", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className='login_popup'>
      <form onSubmit={onLogin} className="login_popup_container">
        <div className="login_popup_title">
          <h2>{currState}</h2>
          <img onClick={() => setpopup(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login_popup_input">
          {currState === "Sign Up" && (
            <input
              name='name'
              onChange={onChangeHandler}
              type="text"
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            type="email"
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            type="password"
            placeholder='Your password'
            required
          />
        </div>
        <button type='submit'>{currState === 'Sign Up' ? 'Create account' : 'Login'}</button>
        <div className="login_popup_condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms & conditions</p>
        </div>

        {currState === 'Login' ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
