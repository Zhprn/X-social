import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn } from "lucide-react";
import SearchComponent from "./Search";
import Category from "./Category";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function ForYou() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const currentUserId = parseInt(Cookies.get("id"));

  useEffect(() => {
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
  }, []);

  // Ambil semua user dan cek status follow
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/users").then((res) => {
      const filtered = res.data.filter((u) => u.id !== currentUserId);
      setUsers(filtered);

      Promise.all(
        filtered.map((user) =>
          axios
            .get(`http://localhost:3000/api/v1/users/${user.username}/follow-status`, {
              withCredentials: true,
            })
            .then((res) => ({ username: user.username, isFollowing: res.data.isFollowing }))
        )
      ).then((results) => {
        const followed = results
          .filter((r) => r.isFollowing)
          .map((r) => r.username);
        setFollowedUsers(followed);
      });
    });
  }, [currentUserId]);

  const handleFollow = async (username) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/users/${username}/follow`,
        { iduser: currentUserId },
        { withCredentials: true }
      );
      setFollowedUsers((prev) => [...prev, username]);

      Swal.fire({
        title: "Followed!",
        text: `You are now following @${username}`,
        icon: "success",
        confirmButtonColor: "#000",
      });
    } catch (err) {
      alert("Failed to follow", err);
    }
  };

  const handleUnfollow = async (username) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/users/${username}/unfollow`,
        { withCredentials: true }
      );
      setFollowedUsers((prev) => prev.filter((u) => u !== username));
    } catch (err) {
      alert("Failed to unfollow", err);
    }
  };

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

        {/* Who to Follow */}
        <div className="mb-3 border-bottom border-dark">
          <h1 className="text-white fs-5 p-1">Who To Follow</h1>

          {users.length === 0 ? (
            <p className="text-white text-center mt-5">No users available.</p>
          ) : (
            users.map((user) => {
              const isFollowing = followedUsers.includes(user.username);
              return (
                <div
                  className="d-flex align-items-center justify-content-between mb-3"
                  key={user.id}
                >
                  <button className="d-flex mt-4 border-0 bg-black">
                    <div
                      className="rounded-circle bg-white d-flex border-0"
                      style={{ width: "40px", height: "40px", fontWeight: "bold" }}
                    ></div>
                    <div className="ms-1 suggest-username text-start">
                      <h2 className="text-white fs-6 mb-0">{user.full_name}</h2>
                      <h2 className="text-white opacity-50 fs-6">@{user.username}</h2>
                    </div>
                  </button>
                  <button
                    className={`mt-3 rounded-4 fw-bold border-0 ${
                      isFollowing ? "bg-white text-dark" : "bg-dark text-white"
                    }`}
                    style={{ width: "100px", height: "35px" }}
                    onClick={() =>
                      isFollowing
                        ? handleUnfollow(user.username)
                        : handleFollow(user.username)
                    }
                    disabled={isFollowing}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Post List */}
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
