import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://101.43.5.148:5000/api/posts" + search);
      setPosts(
        res.data.sort((p2, p1) => {
          return new Date(p1.createdAt) - new Date(p2.createdAt);
        })
      );
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}
