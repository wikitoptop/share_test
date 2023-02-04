import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { BiHash,BiLogIn } from "react-icons/bi";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://101.43.5.148:5000/api/auth/register", {
        username,
        password,
      });
      res.data && window.location.replace("http://101.43.5.148:3000/#/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">注册</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>账号</label>
        <input
          type="text"
          className="registerInput"
          placeholder="输入账号..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>密码</label>
        <input
          type="password"
          className="registerInput"
          placeholder="输入密码..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          <BiHash/>注册
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          <BiLogIn />登录
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>存在错误</span>}
    </div>
  );
}
