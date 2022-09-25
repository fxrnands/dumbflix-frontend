import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../../config/api";
import { Link } from "react-router-dom";

function Listfilm() {
  const title = "List Film Admin";
  document.title = "Dumbflix | " + title;

  let { data: film } = useQuery("filmsCache", async () => {
    const response = await API.get("/films");
    return response.data.data;
  });

  return (
    <>
      <div style={{ padding: "4rem", marginTop: "40px" }}>
        <div style={{ backgroundColor: "black", marginBottom: "40px"}} className="d-flex">
          <div className="d-flex">
            <h2 className="text-light ms-4"> List Film</h2>
          </div>
          <div className="d-flex ms-auto p-2">
            <Button as={Link} to="/admin/addfilm" variant="danger">
              Add Film
            </Button>
          </div>
        </div>
        <div className="containerCard">
          {film?.slice(0, 12).map((item) => (
            <Link to="/detailFilm">
              <div className="box" key={item.id}>
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

export default Listfilm;
