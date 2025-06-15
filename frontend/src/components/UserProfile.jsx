import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Follow from "./Follow";

const UserProfile = () => {
  const { username } = useParams();
  const currentUserId = parseInt(Cookies.get("id"));
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users/${username}`)
      .then((res) => {
        setProfile(res.data);
        fetchPosts(res.data.id);
        checkFollowStatus(username);
      })
      .catch((err) => console.error("Gagal ambil profil:", err));
  }, [username]);

  const fetchPosts = (userId) => {
    axios
      .get("http://localhost:3000/api/v1/posts", { withCredentials: true })
      .then((res) => {
        const userPosts = res.data.filter((post) => post.user_id === userId);
        setPosts(userPosts);
      })
      .catch((err) => console.error("Gagal ambil postingan:", err));
  };

  const checkFollowStatus = (username) => {
    axios
      .get(`http://localhost:3000/api/v1/users/${username}/follow-status`, {
        withCredentials: true,
      })
      .then((res) => setIsFollowing(res.data.status === "following"))
      .catch((err) => console.error("Gagal cek status follow:", err));
  };

  const handleFollow = async () => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/users/${username}/follow`,
        { iduser: currentUserId },
        { withCredentials: true }
      );
      setIsFollowing(true);
      Swal.fire("Followed!", `You are now following @${username}`, "success");
    } catch (err) {
      alert("Gagal follow", err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/users/${username}/unfollow`,
        { withCredentials: true }
      );
      setIsFollowing(false);
    } catch (err) {
      alert("Gagal unfollow", err);
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 postcard border-dark border">
      <div className="bg-secondary" style={{ height: "160px" }}></div>
      <div className="container position-relative" style={{ marginTop: "-80px" }}>
        <div
          className="rounded-circle bg-primary d-flex align-items-center justify-content-center border border-4 border-dark"
          style={{ width: "130px", height: "130px", fontSize: "3rem" }}
        >
          {profile.full_name?.charAt(0) || "?"}
        </div>

        <div className="d-flex justify-content-end mt-2">
          <button
            className={`btn btn-sm rounded-pill px-3 ${
              isFollowing ? "btn-light text-dark" : "btn-outline-light"
            }`}
            onClick={isFollowing ? handleUnfollow : handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <h4 className="mt-2 mb-0">{profile.full_name}</h4>
        <div className="text-white opacity-50 mb-2">@{username}</div>
        <div className="text-white mt-1 d-flex opacity-50">
          <Calendar className="me-2" />
          Joined{" "}
          {profile.createdAt
            ? new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })
            : ""}
        </div>

        <Follow username={profile.username} />
      </div>

      <div className="container mt-4">
        <h5>@{username}'s Posts</h5>
        {posts.length === 0 ? (
          <p className="text-white-50">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="text-white p-3 my-2 border-dark border rounded position-relative"
            >
              <div className="fw-bold">@{profile.username}</div>
              <div className="my-2">{post.caption || post.content}</div>
              {post.attachment && (
                <img
                  src={post.attachment}
                  alt="Attachment"
                  className="img-fluid rounded mb-2"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              )}
              <div className="text-white small">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
