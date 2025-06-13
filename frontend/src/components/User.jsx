import React from "react";
import { Calendar } from "lucide-react";
import ProfileAct from "./ProfileAct";

const TwitterProfile = () => {
  return (
    <div className="bg-black text-white min-vh-100 postcard border-dark border">
      <div className="bg-secondary" style={{ height: "160px" }}></div>

      <div
        className="container position-relative"
        style={{ marginTop: "-80px" }}
      >
        <div
          className="rounded-circle bg-primary d-flex align-items-center justify-content-center border border-4 border-dark"
          style={{
            width: "130px",
            height: "130px",
            fontSize: "3rem",
          }}
        >
          {" "}
          Z
        </div>
        <div className="d-flex justify-content-end mt-2">
          <button className="btn btn-outline-light btn-sm rounded-pill px-3">
            Edit profile
          </button>
        </div>
        <h4 className="mt-2 mb-0">
          Zafran Amuri
          <span className="badge bg-black border-white border ms-4 rounded-4">
            Get verified
          </span>
        </h4>
        <div className="text-white opacity-50 mb-2">@ZafranAmuri</div>
        <div className="text-white mt-1 d-flex opacity-50">
          <Calendar className="me-2" />
          Joined January 2023
        </div>

        <div className="mt-2 text-white-50">
          <span className="fw-bold text-white">2</span> Following
          <span className="fw-bold text-white ms-3">0</span> Followers
        </div>
      </div>
      <ProfileAct />
      <div className="mb-3 border-bottom border-dark p-3">
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
    </div>
  );
};

export default TwitterProfile;
