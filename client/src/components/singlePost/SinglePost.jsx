import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Context } from "../../context/Context";
import "./singlePost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CiEdit,CiTrash,CiHeart } from "react-icons/ci";
import DOMPurify from "dompurify";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
export default function SinglePost() {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const [likes, setLikes] = useState([]);
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://101.43.5.148:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [comdesc, setcomDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleLike = () => {
    try {
      axios.put("http://101.43.5.148:5000/api/posts/" + path + "/like", { userId: user._id });
      window.location.reload();  
    } catch (err) {}
  };
  const handleComment = async (e) => {
    e.preventDefault();
    const newComment = {
      username:user.username,
      userId: user._id,
      postId:path,
      comdesc,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    };
    try {
      await axios.post("http://101.43.5.148:5000/api/comments", newComment) 
      setcomDesc("");
      window.location.reload();                       
    } catch (err) {}
  };

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

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://101.43.5.148:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLikes(res.data.likes.length)
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const fetchComments = async () => {
    const res = await axios.get("http://101.43.5.148:5000/api/comments/thispost/" + path)
    setComments(
        res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
    );
    };
    fetchComments();
}, [path]);

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
                <CiHeart
                  className="singlePostIcon"
                  onClick={handleLike}/>          
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
            {likes}赞&{new Date(post.createdAt).toDateString()}
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
    <input 
      style={{
        width: '100%',
      }}
      className="writeInput"
      type="text"
      placeholder="评论一下吧"
      onChange={(e) => setcomDesc(e.target.value)} />
    <button className="settingsSubmit"       
      style={{
        width: '100%',
      }} 
      onClick={handleComment}>
      评论
    </button>
    <div>
      {comments.map((comment) => (
          <p><p className="commentname">{comment.username}</p>:{comment.comdesc}<br/>评论于 {moment(comment.createdAt).fromNow()}前</p>
      ))}
    </div>
      </div>
    </div>
  );
}
