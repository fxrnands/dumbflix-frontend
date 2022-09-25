import React, { useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import AddEpisode from "../../components/AddEpisode";
import movies from "../../dummyData/movies";
import tvSeries from "../../dummyData/tvseries";

function AdDetailPage() {
  const category = { movies, tvSeries };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [dataCategory, setDataCategory] = useState(category);

  return (
    <div>
      <div className="video-control">
        <iframe
          src="https://www.youtube.com/embed/TcMBFSGVi1c"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          width="900px"
          height="300px"
        />
      </div>
      <div style={{ backgroundColor: "black" }}>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Button className="btn-addepisode" onClick={handleShow}>
            Add Episode
          </Button>

          <AddEpisode show={show} handleClose={handleClose} />
        </div>
      </div>
      <div className="detail-bot">
        <div className="detail-desc">
          <div className="img-mov me-3">
            <img
              src="https://i.ytimg.com/vi/ePpJDKfRAyM/movieposter.jpg"
              alt=""
              width="100%"
            />
          </div>
          <div className="desc-mov">
            <h2>Avengers: End Game</h2>
            <div className="d-flex text-muted">
              <p style={{ padding: "3px" }}>2019 </p>
              <p className="ms-3 txt-mtd">{dataCategory.movies[3].category}</p>
            </div>
            <p
              className=""
              style={{
                textAlign: "justify",
                width: "80%",
              }}
            >
              Geralt of Rivia, a solitary monster hunter, struggles to find his
              place in a world where people often prove more wicked than beast
            </p>
          </div>
        </div>
        <div
          style={{ backgorundColor: "red" }}
          className="d-flex justify-content-center"
        >
          <Carousel className="detail-play-ad">
            <Carousel.Item>
              <img
                width="100%"
                src="https://ichef.bbci.co.uk/news/640/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"
                alt="First episode"
              />
              <Carousel.Caption>
                <h5>In Play Now</h5>
              </Carousel.Caption>
              <p>Episode 1</p>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width="100%"
                src="https://ichef.bbci.co.uk/news/640/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"
                alt="First episode"
              />
              <Carousel.Caption>
                <h5>In Play Now</h5>
              </Carousel.Caption>
              <p>Episode 2</p>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default AdDetailPage;
