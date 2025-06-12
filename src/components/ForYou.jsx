import postImg from "../assets/server-icon.png";
import { MessageCircle, Repeat2, Heart, ChartNoAxesColumn } from "lucide-react";
import SearchComponent from "./Search";
import Category from "./Category";
import ListSearch from "./ListSearch";
export default function ForYou() {
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
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-white d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          ></div>
          <div className="ms-2 post-text">
            <h2 className="text-white mb-0">Zhafran Amuri</h2>
            <h2 className="text-white fw-normal">
              logo server minecraft PPLG terbaru upload 🔥
            </h2>
          </div>
        </div>
        <div className="fs-5 fw-medium d-flex flex-column mt-2">
          <img src={postImg} alt="Post" className="w-100 rounded-1" />
        </div>
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
      <div className="border border-dark postcard rounded p-3 w-auto">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-white d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          ></div>
          <div className="ms-2 post-text">
            <h2 className="text-white mb-0">Zhafran Amuri</h2>
            <h2 className="text-white fw-normal">
              logo server minecraft PPLG terbaru upload 🔥
            </h2>
          </div>
        </div>
        <div className="fs-5 fw-medium d-flex flex-column mt-2">
          <img src={postImg} alt="Post" className="w-100 rounded-1" />
        </div>
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
      <div className="border border-dark postcard rounded p-3 w-auto">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-white d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          ></div>
          <div className="ms-2 post-text">
            <h2 className="text-white mb-0">Zhafran Amuri</h2>
            <h2 className="text-white fw-normal">
              logo server minecraft PPLG terbaru upload 🔥
            </h2>
          </div>
        </div>
        <div className="fs-5 fw-medium d-flex flex-column mt-2">
          <img src={postImg} alt="Post" className="w-100 rounded-1" />
        </div>
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
      <div className="border border-dark postcard rounded p-3 w-auto">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-white d-flex justify-content-center align-items-center"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          ></div>
          <div className="ms-2 post-text">
            <h2 className="text-white mb-0">Zhafran Amuri</h2>
            <h2 className="text-white fw-normal">
              logo server minecraft PPLG terbaru upload 🔥
            </h2>
          </div>
        </div>
        <div className="fs-5 fw-medium d-flex flex-column mt-2">
          <img src={postImg} alt="Post" className="w-100 rounded-1" />
        </div>
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
  );
}
