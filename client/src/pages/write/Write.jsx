import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BiImageAdd,BiPaperPlane } from "react-icons/bi";
export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("http://101.43.5.148:5000/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("http://101.43.5.148:5000/api/posts", newPost);
      window.location.replace("http://101.43.5.148:3000/#/post/" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup ">
          <input
            type="text"
            placeholder="你的标题..."
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup ">
          <label htmlFor="fileInput" className="fileInput">
            <BiImageAdd />上传图片
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="writeFormGroup">
        <ReactQuill
            className="writeText"
            theme="snow"
            value={desc}
            onChange={setDesc}
          />
        </div>
        <div className="writeFormGroup">
        <button className="writeSubmit" type="submit">
          <BiPaperPlane />发布
        </button>
        </div>
      </form>
    </div>
  );
}
