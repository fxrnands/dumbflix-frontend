import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import AddEpisode from "../../components/AddEpisode";

function AdDetailPage() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  let { id } = useParams();
  let { data: film } = useQuery("productCache", async () => {
    const response = await API.get("/film/" + id);
    return response.data.data;
  });

  return (
    <div>
      <div className="video-control">
        <iframe src={film?.linkFilm} allow="autoplay; encrypted-media" allowFullScreen title="video" width="900px" height="300px" />
      </div>
      {/* <div style={{ backgroundColor: "black" }}>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button className="btn-addepisode" onClick={handleShow}>
            Add Episode
          </Button>

          <AddEpisode show={show} handleClose={handleClose} />
        </div>
      </div> */}
      <div className="detail-bot">
        <div className="detail-desc">
          <div className="img-mov me-3">
            <img src={film?.thumbnailFilm} alt="" width="100%" />
          </div>
          <div className="desc-mov">
            <h2>{film?.title}</h2>
            <div className="d-flex text-muted">
              <p style={{ padding: "3px" }}>{film?.year} </p>
              <p className="ms-3 txt-mtd">{film?.category?.name}</p>
            </div>
            <p
              className=""
              style={{
                textAlign: "justify",
                width: "80%",
              }}
            >
              {film?.desc}
            </p>
          </div>
        </div>
        <div className="detail-play">
          <div
            className="img-in-play mt-1"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(104, 106, 116, 0), rgba(0, 0, 0, 0.99)),url(${film?.thumbnailFilm})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="d-flex justify-content-center align-items-end" style={{ width: "100%", marginTop: "10px" }}>
              <p
                style={{
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                In Play Now <br />
                <br />
                <br />
                <span className="text-muted"> {film?.title}</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdDetailPage;
