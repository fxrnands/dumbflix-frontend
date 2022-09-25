import { React, useState } from "react";
import bgImg from "../../assets/bgjoker.png";
import img from "../../assets/txtjoker.png";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import { Button } from "react-bootstrap"
import { BsFillCaretRightFill } from "react-icons/bs";

function AmoviesPage() {
  const title = "Movies";
  document.title = "Dumbflix | " + title;

  let { data: film } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

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
              In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the
              Joker.
            </p>
            <div className="d-flex">
              <p style={{ padding: "3px" }}>2019 </p>
              <p className="ms-3 movies"> Movies</p>
            </div>
            <Button className="WatchButton" variant="danger">
              <BsFillCaretRightFill style={{ marginRight: "10px" }} />
              Watch Now
            </Button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black" }}>
        <h4 className="text-white ms-3">Movies</h4>
        <div className="containerCard">
          {film?.map((item, index) => (
            <div className="box mb-5" key={index}>
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
          ))}
        </div>
      </div>
    </>
  );
}

export default AmoviesPage;
