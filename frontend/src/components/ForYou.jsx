import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn } from "lucide-react";
import SearchComponent from "./Search";
import Category from "./Category";
import { useEffect, useState } from "react";
import ListSearch from "./ListSearch";
import axios from "axios";
export default function ForYou() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/auth/me", { withCredentials: true })
      .then((res) => {
        setUserId(res.data.id); // Simpan user login id
      })
      .catch((err) => {
        console.error("Gagal mengambil user login:", err);
      });
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/posts", {
        withCredentials: true,
      })
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-white text-center mt-5">Loading posts...</p>;
  }
  return (
    <div className="post-container d-flex flex-column align-items-center mt-3 postcard">
      <div className="border border-dark postcard rounded p-3 w-auto">
        <div className="mb-3">
          <SearchComponent />
          <Category />
        </div>
        <div className="mb-3 border-bottom border-dark">
          <ListSearch />
          <h1 className="text-white fs-5 p-1">Who To Follows</h1>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <button className="d-flex mt-2 border-0 bg-black">
              <div
                className="rounded-circle bg-white d-flex border-0"
                style={{ width: "40px", height: "40px", fontWeight: "bold" }}
              ></div>
              <div className="ms-1 suggest-username">
                <h2 className="text-white">Elon Musk</h2>
                <h2 className="text-white opacity-50">@elonmusk</h2>
              </div>
            </button>
            <button className="bg-white border-0 w-25 mt-3 rounded-4 fw-bold">
              Follow
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <button className="d-flex mt-2 border-0 bg-black">
              <div
                className="rounded-circle bg-white d-flex border-0"
                style={{ width: "40px", height: "40px", fontWeight: "bold" }}
              ></div>
              <div className="ms-1 suggest-username">
                <h2 className="text-white">Elon Musk</h2>
                <h2 className="text-white opacity-50">@elonmusk</h2>
              </div>
            </button>
            <button className="bg-white border-0 w-25 mt-3 rounded-4 fw-bold">
              Follow
            </button>
          </div>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <button className="d-flex mt-2 border-0 bg-black">
              <div
                className="rounded-circle bg-white d-flex border-0"
                style={{ width: "40px", height: "40px", fontWeight: "bold" }}
              ></div>
              <div className="ms-1 suggest-username">
                <h2 className="text-white">Elon Musk</h2>
                <h2 className="text-white opacity-50">@elonmusk</h2>
              </div>
            </button>
            <button className="bg-white border-0 w-25 mt-3 rounded-4 fw-bold">
              Follow
            </button>
          </div>
        </div>
        <h1 className="text-white fs-5 p-1 mb-3">Post For You</h1>
        <div>
          {posts.length === 0 ? (
            <p className="text-white text-center mt-5">No posts available.</p>
          ) : (
            posts.map((post) => (
              <div
                className="post-container d-flex flex-column align-items-center mt-3 postcard"
                key={post.id}
              >
                <div className="border border-dark postcard rounded p-3 w-auto">
                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle bg-white d-flex justify-content-center align-items-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        fontWeight: "bold",
                      }}
                    >
                      {post?.user?.full_name?.charAt(0) || "?"}
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
                          maxHeight: "500px",
                          objectFit: "cover",
                          width: "500px",
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
            ))
          )}
        </div>
      </div>
    </div>
  );
}
