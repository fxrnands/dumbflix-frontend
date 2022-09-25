import { React, useState } from "react";
import { Button } from "react-bootstrap";
import { BsFillCaretRightFill } from "react-icons/bs";
import bgImg from "../../assets/the-witcher.png";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import img from "../../assets/txtw.png";
import TVSeries from "../../assets/TVLogo.png";

function HomePage() {
  const title = "Home";
  document.title = "Dumbflix | " + title;

  let { data: film } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });
  console.log(film);

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(104, 106, 116, 0), rgba(0, 0, 0, 0.99)), url(${bgImg})`,
          height: "110vh",
          width: "100%",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="ctnm">
          <div className="container p-5">
            <img src={img} alt="" />
            <p
              className="mt-3"
              style={{
                textAlign: "justify",
                width: "43%",
              }}
            >
              Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beast
            </p>
            <div className="d-flex">
              <p style={{ padding: "3px" }}>2019 </p> <img style={{ marginLeft: "20px", height: "30px" }} src={TVSeries}></img>
            </div>
            <Button style={{ marginTop: "20px" }} className="WatchButton" variant="danger">
              <BsFillCaretRightFill style={{ marginRight: "10px" }} />
              Watch Now
            </Button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black" }}>
        <h4 style={{ marginTop: "40px", marginBottom: "60px" }} className="text-white ms-3">
          Our Movies & TV Series Collection
        </h4>
        <div className="containerCard">
          {film?.slice(0, 12).map((item, index) => (
            <Link to={`/user/detailfilm/${item.id}`}>
              <div className="box" key={index}>
                <div className="imgBx">
                  <img src={item.thumbnailFilm} alt="" />
                </div>
                <div className="content">
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.year}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
