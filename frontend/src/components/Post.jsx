import { useEffect, useState } from "react";
import axios from "axios";
import {
  MessageCircle,
  Repeat2,
  Heart,
  ChartNoAxesColumn,
} from "lucide-react";
import Cookies from "js-cookie";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = parseInt(Cookies.get("id"));

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth", { withCredentials: true })
      .catch((err) => {
        console.error("Gagal mengambil user login:", err);
      });
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios
      .get("http://localhost:3000/api/v1/posts", { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <p className="text-white text-center mt-5">Loading posts...</p>;
  }

  const filteredPosts = posts.filter((post) => {
    const postUser = post.user;
    if (!postUser) return false;

    const isOwnPost = postUser.id === userId;
    const isPublic = postUser.is_private === false || postUser.is_private === 0;
    const isPrivateFollowed =
      (postUser.is_private === true || postUser.is_private === 1) &&
      post.status === "following";

    return isOwnPost || isPublic || isPrivateFollowed;
  });

  if (filteredPosts.length === 0) {
    return <p className="text-white text-center mt-5">No posts available.</p>;
  }

  return (
    <div>
      {filteredPosts.map((post) => (
        <div
          className="post-container d-flex flex-column align-items-center mt-3 postcard"
          key={post.id}
        >
          <div className="border border-dark postcard rounded p-3 w-auto">
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-white d-flex justify-content-center align-items-center"
                style={{ width: "40px", height: "40px", fontWeight: "bold" }}
              >
                {post?.user?.full_name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="ms-2 post-text">
                <h2 className="text-white mb-0">
                  {post?.user?.full_name || "Unknown"}
                </h2>
                <h2 className="text-white fw-normal">{post.caption}</h2>
              </div>
            </div>

            {post.attachment && (
              <div className="fs-5 fw-medium d-flex flex-column mt-2">
                <img
                  src={post.attachment}
                  alt="Post"
                  className="rounded-1"
                  style={{
                    maxHeight: "600px",
                    objectFit: "cover",
                    width: "680px",
                  }}
                />
              </div>
            )}

            <div className="text-white w-100 mt-3 d-flex justify-content-around post-action">
              <h1>
                <MessageCircle size={20} /> 28
              </h1>
              <h1>
                <Repeat2 size={20} /> 510
              </h1>
              <h1>
                <Heart size={20} /> 41,2K
              </h1>
              <h1>
                <ChartNoAxesColumn size={20} /> 2M
              </h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
