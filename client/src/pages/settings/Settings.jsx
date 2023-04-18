import "./settings.css";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { BiArrowFromBottom,BiCheckDouble } from "react-icons/bi";
export default function Settings() {
  const [file, setFile] = useState(null);
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();
  const [success, setSuccess] = useState(false);
  const [useraddress, setUseraddress] = useState("");
  const PF = "http://101.43.5.148:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      password,
      useraddress:useraddress,
      cash:user.cash,
      device:user.device,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("http://101.43.5.148:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("http://101.43.5.148:5000/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">你的账号</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>头像</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF+user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <BiArrowFromBottom className="settingsPPIcon"/>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>账号</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>密码</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>位置</label>
          <input
            type="text"
            onChange={(e) => setUseraddress(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            <BiCheckDouble/>更新
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              更新成功！
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
