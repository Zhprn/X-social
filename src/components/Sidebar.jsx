import {
  House,
  Search,
  Bell,
  Mail,
  CircleSlash2,
  X,
  UsersRound,
  UserRound,
  CircleEllipsis,
  Camera,
  List,
  Smile,
} from "lucide-react";
import imgLogo from "../assets/xlogo.webp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function Sidebar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDropup, setShowDropup] = useState(false);
  const handleToggleDropup = () => setShowDropup(!showDropup);

  return (
    <div className="sidebar d-flex flex-column p-1 align-items-start fixed-top border-end border-dark min-vh-100 bg-black">
      <img src={imgLogo} className="w-25 mb-3" alt="Logo" />

      <button onClick={() => navigate("/")}>
        <House className="me-2" /> Home
      </button>
      <button onClick={() => navigate("/explore")}>
        <Search className="me-2" /> Explore
      </button>
      <button>
        <Bell className="me-2" /> Notifications
      </button>
      <button>
        <Mail className="me-2" /> Messages
      </button>
      <button>
        <CircleSlash2 className="me-2" /> Grok
      </button>
      <button>
        <UsersRound className="me-2" /> Communities
      </button>
      <button>
        <X className="me-2" /> Premium
      </button>
      <button onClick={() => navigate("/profile")}>
        <UserRound className="me-2" /> Profile
      </button>
      <button>
        <CircleEllipsis className="me-2" /> More
      </button>

      <button onClick={handleShow} className="btn-post mt-2">
        Post
      </button>

      <div className="position-relative w-100 mt-auto">
        <button className="d-flex w-100" onClick={handleToggleDropup}>
          <div
            className="rounded-circle bg-white d-flex"
            style={{ width: "60px", height: "60px", fontWeight: "bold" }}
          ></div>
          <div className="ms-2 text-start">
            <h2 className="fs-5 text-white">Zhafran Amuri</h2>
            <h2 className="fs-6 text-white opacity-50">@zhfrnamrr</h2>
          </div>
        </button>

        {showDropup && (
          <div
            className="position-absolute w-100 bg-black border border-dark rounded-4 p-2"
            style={{
              bottom: "70px",
              zIndex: 1000,
            }}
          >
            <button className="w-100 text-start btn btn-link text-white text-decoration-none">
              Logout
            </button>
          </div>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-black border-0"></Modal.Header>
        <Modal.Body className="bg-black">
          <div className="border border-dark postcard rounded p-3 w-100 ">
            <div className="d-flex mb-3">
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
              <button className="btn text-primary w-75">
                <Camera size={20} className="me-3" />
                <CircleSlash2 size={20} className="me-3" />
                <List size={20} className="me-3" />
                <Smile size={20} />
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="bg-black border-top border-dark">
          <Button
            variant="white"
            className="bg-white rounded-4 text-black"
            onClick={handleClose}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
