import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import TvseriesPage from "./pages/user/TvseriesPage";
import MoviesPage from "./pages/user/MoviesPage";
import NotFound from "./components/NotFound";
import HomePage from "./pages/user/HomePage";
import Profile from "./pages/user/Profile";
import DetailPage from "./pages/user/DetailPage";
import Upgrade from "./pages/user/Upgrade";
import LayoutUser from "./pages/layout/LayoutUser";
import LayoutAdmin from "./pages/layout/LayoutAdmin";
import Listfilms from "./pages/admin/listFilmAdmin/listfilms";
import Addfilm from "./pages/admin/Addfilm";
import ListTransaction from "./pages/admin/ListTransaction";
import AdDetailPage from "./pages/admin/AdDetailPage";
import AhomePage from "./pages/auth/AhomePage";
import AmoviesPage from "./pages/auth/AmoviesPage";
import AtvseriesPage from "./pages/auth/AtvseriesPage";
import "./App.css";

import { API, setAuthToken } from "./config/api";
import LayoutAuth from "./pages/layout/LayoutAuth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  console.log("ini state:", state);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    // Redirect Auth
    if (state.isLogin === false) {
      navigate("/");
    } else {
      if (state.user.role === "admin") {
        navigate("/admin");
      } else if (state.user.role === "user") {
        navigate("/user");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log("ini response:", response);

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
    console.log("user context", state);
  }, []);
  return (
    <>
      <Routes>
        {/* auth */}
        <Route path="/" element={<LayoutAuth />}>
          <Route index element={<AhomePage />} />
          <Route path="/tvshows" element={<AtvseriesPage />} />
          <Route path="/movies" element={<AmoviesPage />} />
        </Route>
        {/* user */}
        <Route path="/user" element={<LayoutUser />}>
          <Route index element={<HomePage />} />
          <Route path="/user/tvshows" element={<TvseriesPage />} />
          <Route path="/user/movies" element={<MoviesPage />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/upgrade" element={<Upgrade />} />
          <Route path="/user/detailfilm/:id" element={<DetailPage />} />
        </Route>
        {/* admin */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<ListTransaction />} />
          <Route path="/admin/addfilm" element={<Addfilm />} />
          <Route path="/admin/listfilms" element={<Listfilms />} />
          <Route path="/admin/detail/:id" element={<AdDetailPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
