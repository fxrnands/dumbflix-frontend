import React, { useEffect, useState, useContext, useRef } from "react";
import { API } from "../../config/api";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import clip from "../../assets/clip.png";
import { UserContext } from "../../context/userContext";

function Upgrade() {
  const title = "Be Premium";
  document.title = "Dumbflix | " + title;

  const [state] = useContext(UserContext);
  console.log(state);

  let navigate = useNavigate();

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
        },
      };

      // const data = {
      //   user_id: state.user.id,
      // };

      // const body = JSON.stringify(data);

      const response = await API.post("/transaction", config);
      console.log(response);

      // Create variabel for store token payment from response here ...
      const token = response.data.data.token;

      // Init Snap for display payment page with token here ...
      window.snap.pay(token, {
        onSuccess: function (result) {
          /* You may add your own implementation here */
          navigate("/user/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate("/user/profile");
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="payment-container">
      <div className="payment-details">
        {state.user.subscribe == false ? (
          <div className="payment-desc">
            <h1
              style={{
                marginBottom: "60px",
              }}
            >
              Premium
            </h1>
            <p>
              Dengan berlangganan Premium dengan harga Rp. 30.000,- Anda bisa
              menikmati streaming film-film yang kekinian dari{" "}
              <span className="red">DUMBFLIX </span> <br />{" "}
              <span className="red">DUMBFLIX </span> : 0981312323
            </p>
            <form>
              <div className="form-payment">
                <button
                  onClick={(e) => handleBuy.mutate(e)}
                  type="submit"
                  className="btnsub"
                  style={{
                    height: "35px",
                    fontSize: "16px",
                    marginTop: "25px",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3>
              Akun Anda sudah premium! Silahkan nikmati berbagai macam film yang
              ada ..
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upgrade;
