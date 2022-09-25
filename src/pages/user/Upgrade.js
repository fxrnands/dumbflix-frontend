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

  const [previewSrc, setPreviewSrc] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-on6S64ToFp0HbEkn";

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

  const onChangeFiles = (e) => {
    let fileInfo = e.target.files[0];
    setFile(fileInfo);
    let reader = new FileReader();

    if (e.target.files.length === 0) {
      return;
    }

    reader.onloadend = (e) => {
      setPreviewSrc([reader.result]);
    };

    reader.readAsDataURL(fileInfo);
  };

  const inputFileRef = useRef(null);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  return (
    <div className="payment-container">
      <div className="payment-details">
        <div className="payment-desc">
          <h1
            style={{
              marginBottom: "30px",
            }}
          >
            Premium
          </h1>
          <p>
            GET YOUR PREMIUM STATUS NOW ONLY 30K IDR{" "}
            <span className="red">DUMBFLIX </span> <br />{" "}
            <span className="red">DUMBFLIX </span> : 0981312323
          </p>
          <form>
            <div className="form-payment">
              <button
                type="button"
                onClick={() => onBtnClick()}
                className="btn-light"
                style={{
                  width: "100%",
                  height: "50px",
                  fontSize: "18px",
                  textAlign: "left",
                  padding: "0 10px",
                }}
              >
                Attach proof of transfer{" "}
                <div
                  style={{
                    float: "right",
                    display: "inline",
                    fontSize: "20px",
                  }}
                >
                  <img src={clip} alt="" />
                </div>
              </button>
              <input
                onChange={(e) => onChangeFiles(e)}
                type="file"
                name="file"
                ref={inputFileRef}
                style={{ display: "none" }}
              />
              <img src={previewSrc} alt="" className="preview-src" />

              <button
                onClick={(e) => handleBuy.mutate(e)}
                type="submit"
                className="btnsub"
                style={{
                  height: "35px",
                  fontSize: "16px",
                  marginTop: "15px",
                }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
