import { React, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import bgImg from "../../assets/bglacasa.png";
import img from "../../assets/lacasa.png";
import tvSeries from "../../dummyData/tvseries.js";
import TVSeriesLogo from "../../assets/TVLogo.png";
import { Button } from "react-bootstrap";
import { BsFillCaretRightFill } from "react-icons/bs";

function TvseriesPage() {
  const title = "Tv Shows";
  document.title = "Dumbflix | " + title;

  const [dataTvSeries, setDataTvSeries] = useState(tvSeries);

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
              Money Heist is a crime drama on Netflix - originally called La Casa de Papel. Money Heist season 3 has just been released by the streaming service. The plot reads: "Eight thieves take hostages and lock themselves in the Royal
              Mint of Spain as a criminal mastermind manipulates the police to carry out his plan."
            </p>
            <div className="d-flex">
              <p style={{ padding: "3px" }}>2019 </p> <img style={{ marginLeft: "20px", height: "30px" }} src={TVSeriesLogo}></img>
            </div>
            <Button className="WatchButton" variant="danger">
              <BsFillCaretRightFill style={{ marginRight: "10px" }} />
              Watch Now
            </Button>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "black" }}>
        <h4 className="text-white ms-3">Tv Series</h4>
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

export default TvseriesPage;
