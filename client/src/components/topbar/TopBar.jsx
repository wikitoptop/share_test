import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const PF = "http://101.43.5.148:5000/images/"

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              首页
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              发布
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/prebook">
              预约
            </Link>
          </li>
          <li className="topListItem">
            <a className="link" href="https://react-icons.github.io/react-icons/icons?name=ci">
              感知
            </a>
          </li>
          <li className="topListItem">
            <Link className="link" to="/about">
              开始
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "登出"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />      
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                登录
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                注册
              </Link>
            </li>
          </ul>
        )}
        <li className="topListItemName">
          <Link className="link" to="/settings">
              {user && user.username}
          </Link>
        </li>  
      </div>
    </div>
  );
}
