export default function Suggest() {
  return (
    <div className="p-3 border border-dark rounded-4 mt-3 suggest fixed-top">
      <h1 className="text-white fs-4">Who To Follows</h1>
      <div className="border-2 border-dark suggest-card">
        <div className="d-flex align-items-center justify-content-between">
          <button className="d-flex mt-4 border-0 bg-black">
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

        <div className="d-flex align-items-center justify-content-between">
          <button className="d-flex mt-4 border-0 bg-black">
            <div
              className="rounded-circle bg-white d-flex border-0"
              style={{ width: "40px", height: "40px", fontWeight: "bold" }}
            ></div>
            <div className="ms-1 suggest-username">
              <h2 className="text-white">Joko Widodo</h2>
              <h2 className="text-white opacity-50">@jokowidodo</h2>
            </div>
          </button>
          <button className="bg-white border-0 w-25 mt-3 rounded-4 fw-bold">
            Follow
          </button>
        </div>

        <div className="d-flex align-items-center justify-content-between">
          <button className="d-flex mt-4 border-0 bg-black">
            <div
              className="rounded-circle bg-white d-flex border-0"
              style={{ width: "40px", height: "40px", fontWeight: "bold" }}
            ></div>
            <div className="ms-1 suggest-username">
              <h2 className="text-white">NBA</h2>
              <h2 className="text-white opacity-50">@NBA</h2>
            </div>
          </button>
          <button className="bg-white border-0 w-25 mt-3 rounded-4 fw-bold">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
