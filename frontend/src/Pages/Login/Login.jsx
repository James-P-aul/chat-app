import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../Context/Chat-Context";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  //Login and Signup
  const [text, setText] = useState("Login");

  const { url, token, setToken, loggedInUser, setLoggedInUser, getAllUsers } =
    useContext(ChatContext);

  const [userData, setUserData] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const onChangeHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const setUserDataToDefault = () => {
    setUserData({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (text === "Signup") {
      newUrl += "/api/auth/signup";
    } else {
      newUrl += "/api/auth/login";
    }
    const response = await axios.post(newUrl, userData);
    if (response.data.success === false) {
      setUserDataToDefault();
      toast.error(response.data.message);
    } else {
      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Welcome!");
      setLoggedInUser({ user: response.data });
      getAllUsers(token);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full bg-gray-300 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-100">
          Login <span className="text-blue-600">ChatApp</span>
        </h1>
        <div className="w-full max-w-xs mt-3">
          <form onSubmit={onSubmitHandler}>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                name="userName"
                onChange={onChangeHandler}
                value={userData.userName}
                type="text"
                placeholder="Username"
              />
              {text == "Signup" ? (
                <>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="username"
                  >
                    Full Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="fullName"
                    onChange={onChangeHandler}
                    value={userData.fullName}
                    type="text"
                    placeholder="Full Name"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                onChange={onChangeHandler}
                value={userData.password}
                type="password"
                placeholder="******************"
              />
              {text == "Signup" ? (
                <>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="confirmPassword"
                    onChange={onChangeHandler}
                    value={userData.confirmPassword}
                    type="password"
                    placeholder="******************"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className="inline-block align-baseline font-bold text-sm text-gray-600  mb-2">
              {text == "Login"
                ? "Don't have an account ?"
                : "Already have an account ?"}
              <a
                className="text-red-500 hover:text-black"
                onClick={() => {
                  text == "Login" ? setText("Signup") : setText("Login");
                }}
                href="#"
              >
                {text == "Login" ? " Sign up" : " Login"}
              </a>
            </div>
            {text === "Signup" ? (
              <label
                htmlFor="gender"
                className="flex align-baseline font-bold text-sm text-gray-600 gap-2  mb-2"
              >
                <input
                  type="radio"
                  // checked={userData.gender == "male"}
                  name="gender"
                  onClick={onChangeHandler}
                  value="Male"
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  // checked={userData.gender == "female"}
                  onClick={onChangeHandler}
                  value="Female"
                />
                Female
              </label>
            ) : (
              <></>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-800 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
