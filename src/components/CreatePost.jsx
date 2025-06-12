import { Camera, CircleSlash2, List, Smile, CalendarClock } from "lucide-react";

export default function CreatePost() {
  return (
    <div className="post-container d-flex flex-column mt-3 postcard">
      <div className="border border-dark rounded p-3 w-auto postcard">
        <div className="d-flex mb-3 align-items-center ">
          <div
            className="rounded-circle bg-white d-flex justify-content-center align-items-center me-2"
            style={{ width: "40px", height: "40px", fontWeight: "bold" }}
          ></div>
          <textarea
            className="form-control bg-black border-0 text-white"
            placeholder="Mulai diskusi yuk..."
            rows={2}
          />
        </div>
        <div className="d-flex justify-content-between create-action">
          <button className="btn text-primary w-50">
            <Camera size={20} className="me-3" />
            <CircleSlash2 size={20} className="me-3" />
            <List size={20} className="me-3" />
            <Smile size={20} />
          </button>
          <button className="btn bg-white opacity-50 fw-bold text-black rounded-5">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
