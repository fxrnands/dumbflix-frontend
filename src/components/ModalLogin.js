import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { Modal, Alert } from "react-bootstrap";

export default function ModalLogin({ loginShow, setLoginShow, loginHere }) {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      console.log("user submit", state);

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data for login process
      const response = await API.post("/login", body, config);
      // Checking process

      if (response.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        // console.log(response);
        // Status check
        if (response.data.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);

      if (error.response.data.code == 403) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Email not found!
          </Alert>
        );
        setMessage(alertPassword);
      }
      if (error.response.data.code == 404) {
        const alertPassword = (
          <Alert variant="danger" className="py-1">
            Password not match!
          </Alert>
        );
        setMessage(alertPassword);
      }
    }
  });

  function ShowPass() {
    let x = document.getElementById("ShowPass");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  return (
    <Modal
      size="md"
      show={loginShow}
      onHide={() => setLoginShow(false)}
      centered
    >
      <Modal.Body className="bg-Modal">
        <div className="card-auth p-4">
          <div
            style={{
              fontSize: "30px",
              lineHeight: "49px",
              fontWeight: "700",
              color: "white",
            }}
            className="mb-3"
          >
            Login
          </div>
          {message && message}
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <div className="mt-3 form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                id="ShowPass"
                value={password}
                onChange={handleChange}
                className="px-3 py-2 mt-3"
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="Show"
                onClick={ShowPass}
                className="mt-3"
              />
              <label for="Show" className="ms-1">
                Show Password
              </label>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn1">
                Login
              </button>
              <p className="warning">
                Don't have an account?
                <button onClick={loginHere} className="btnHere">
                  Click here
                </button>
              </p>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
