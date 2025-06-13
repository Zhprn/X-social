import CreatePost from "../components/CreatePost";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import Suggest from "../components/Suggest";

export default function Home() {
  return (
    <div className="d-flex flex-column container w-50 home-container">
      <Sidebar />
      <CreatePost />
      <Post />
      <Suggest />
    </div>
  );
}