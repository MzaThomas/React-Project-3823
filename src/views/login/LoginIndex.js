import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import { checkNullOrBlank, checkPassword } from "../common/CommonValidation";
import Loading from "../common/Loading";
import { ApiRequest } from "../common/ApiRequest";
import { useEffect } from "react";
import $ from "jquery";


const LoginIndex = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false); // For Loading
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [userCode, setUserCode] = useState(""); // for shop code
  const [password, setPassword] = useState(""); // for password
  const [zoomSize, setZoomSize] = useState(Math.round(window.devicePixelRatio * 100)); // for browser

  useEffect(() => {
    $(window).resize(function () {
      setZoomSize(Math.round(window.devicePixelRatio * 100));
    });
  }, []);


  let err = [];



  const passwordChange = (e) => {
    setSuccess([]);
    setError([]);
    setPassword(e.target.value);
  }

  const userCodeChange = (e) => {
    setSuccess([]);
    setError([]);
    setUserCode(e.target.value);
  }

  const loginClick = async () => {
    if (!checkNullOrBlank(userCode)) {
      err.push("Please fill User Code");
    }

    if (!checkNullOrBlank(password)) {
      err.push("Please fill Password");
    }

    if (err.length > 0) {
      setSuccess([]);
      setError(err);
    } else {
      setError([]);
      // if(password=="12345" && userCode=="20001"){
      //   setSuccess(["Login successfully"]);
      //   history.push(`/Dashboard`)
      //   localStorage.setItem(`LoginProcess`, "true");
      // }
      // else{
      //     setError(["User Code or Password is Wrong"])
      // }

      let saveData = {

        method: "get",
        url: `admin/login`,
        params: {
          user_code: userCode,
          password: password
        },
      };
      let response = await ApiRequest(saveData);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        if (response.data.status == "OK") {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          history.push(`/Dashboard`)
          localStorage.setItem(`LoginProcess`, "true");
          setError([]);
        } else {
          setError([response.data.message]);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
      setLoading(false);
    }

  }
  

  const keyDownHandler = (e) => {
    if (e.key == "Enter") {
      loginClick();
      e.preventDefault();
    }
  };


  return (
    <>
      <LoginForm
        keyDownHandler={keyDownHandler}
        loginClick={loginClick}
        passwordChange={passwordChange}
        password={password}
        userCodeChange={userCodeChange}
        userCode={userCode}
        success={success}
        error={error}
        zoomSize={zoomSize}
      />
      <Loading start={loading} />
    </>
  )
}

export default LoginIndex
