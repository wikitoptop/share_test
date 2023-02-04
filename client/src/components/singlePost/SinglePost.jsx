import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import "./singlePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiEdit,CiTrash } from "react-icons/ci";
import DOMPurify from "dompurify";
import { BiCheck } from "react-icons/bi";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://101.43.5.148:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://101.43.5.148:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://101.43.5.148:5000/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://101.43.5.148:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <CiEdit                   
                  className="singlePostIcon"
                  onClick={() => setUpdateMode(true)} />
                <CiTrash                   
                  className="singlePostIcon"
                  onClick={handleDelete} />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            作者:
              <b> {post.username}</b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <ReactQuill
          className="singlePostDescInput"
          theme="snow"
          value={desc}
          onChange={setDesc}
        />
        ) : (
          <p 
              className="singlePostDesc"
              dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}>      
          </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            <BiCheck/>更新
          </button>
        )}
      </div>
    </div>
  );
}
