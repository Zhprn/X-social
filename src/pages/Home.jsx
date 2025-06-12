import CreatePost from "../components/CreatePost";
import Post from "../components/Post";

export default function Home() {
  return (
    <div className="d-flex flex-column container w-50 home-container">
      <CreatePost />
      <Post />
    </div>
  );
}
    