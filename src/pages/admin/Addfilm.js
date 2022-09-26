import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CgAttachment } from "react-icons/cg";
import { API } from "../../config/api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

function Addfilm() {
  const title = "Add Film";
  document.title = "Dumbflix | " + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    thumbnailFilm: "",
    linkFilm: "",
    year: "",
    desc: "",
    categoryId: "",
  });

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get("/categorys");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    console.log("handle change", e.target.name);
    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("thumbnailFilm", form.thumbnailFilm[0], form.thumbnailFilm[0].name);
      formData.set("linkFilm", form.linkFilm);
      formData.set("year", form.year);
      formData.set("desc", form.desc);
      formData.set("category_id", form.categoryId);

      console.log(form);

      const response = await API.post("/film", formData, config);
      console.log(response);

      navigate("/admin/listfilms");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "black", marginTop: "11vh" }}>
        <div>
          <h2 className="text-light col-2 d-flex justify-content-end">Add Film</h2>
        </div>
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="d-flex justify-content-center">
          <div className="row g-2 d-flex justify-content-center">
            <div style={{ width: "950px", marginLeft: "35px" }}>
              <div className="form-floating">
                <Form.Group className="mt-3">
                  <Form.Control type="text" name="title" id="title" onChange={handleChange} placeholder="Title" className="bg-dark text-white" />
                </Form.Group>
              </div>
            </div>
            <div className="col-2">
              <div className="form-floating">
                <Form.Group className=" mt-2 ms-2 d-flex ">
                  {preview && (
                    <div>
                      <img
                        src={preview}
                        style={{
                          maxWidth: "150px",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                        alt={preview}
                      />
                    </div>
                  )}
                  <Form.Label for="fileattach" className="d-block p-2 bg-dark text-white rounded border" type="file" style={{ cursor: "pointer" }}>
                    Attach Thumbail
                    <CgAttachment className="text-danger mx-2" />
                  </Form.Label>
                  <Form.Control type="file" id="fileattach" name="thumbnailFilm" onChange={handleChange} hidden />
                </Form.Group>
              </div>
            </div>
            <div className="col-10 d-flex justify-content-center">
              <Form.Control type="text" placeholder="Link Film" name="linkFilm" onChange={handleChange} className="bg-dark text-white" />
            </div>
            <div className="col-10 d-flex justify-content-center">
              <Form.Control type="number" placeholder="Year" name="year" onChange={handleChange} className="bg-dark text-white" />
            </div>
            <div className="col-10 d-flex justify-content-center">
              <select className="form-select bg-dark text-white" aria-label="Default select example" onChange={handleChange} name="categoryId">
                <option value="">Category</option>
                {categories.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="col-10 d-flex justify-content-center input-group-lg">
              <textarea className="form-control bg-dark text-white" id="exampleFormControlTextarea1" placeholder="Description" rows="3" name="desc" onChange={handleChange}></textarea>
            </div>

            <div className="col-10 d-flex justify-content-end">
              <button class="btn btn-danger float-md-end btn-lg  d-grid gap-2 col-2 " type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Addfilm;
