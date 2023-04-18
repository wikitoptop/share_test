import "./post.css";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
export default function Post({ post }) {
  const PF = "http://101.43.5.148:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postUser">
          By {post.username}
        </span>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <div className="postDesc">
        <p 
              dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}>      
        </p>
      </div>
    </div>
  );
}
