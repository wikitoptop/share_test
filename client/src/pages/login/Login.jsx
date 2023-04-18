import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { BiHash,BiLogIn } from "react-icons/bi";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://101.43.5.148:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">登录</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>账号</label>
        <input
          type="text"
          className="loginInput"
          placeholder="输入账号..."
          ref={userRef}
        />
        <label>密码</label>
        <input
          type="password"
          className="loginInput"
          placeholder="输入密码..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          <BiLogIn />登录
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          <BiHash/>注册
        </Link>
      </button>
    </div>
  );
}
