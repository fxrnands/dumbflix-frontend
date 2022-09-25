import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Logo from "../../assets/dumbflix-logo.png";
import UserBlank from "../../assets/killua.jpg";
import Profil from "../../assets/profile.png";
import Pay from "../../assets/bill.png";
import LogoutIcon from "../../assets/logout.svg";

function NavbarUser() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div>
      <Navbar
        fixed="top"
        bg="dark"
        variant="dark"
        expand="lg"
        className="navbg"
        style={{ height: "9vh" }}
      >
        <Container>
          <Nav>
            <Nav.Link>
              <Link to="/user" className="navlink text-white fw-bold">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/user/tvshows" className="navlink text-white fw-bold">
                TV Shows
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/user/movies" className="navlink text-white fw-bold">
                Movies
              </Link>
            </Nav.Link>
          </Nav>
          <Navbar.Brand as={Link} to="/user" style={{ marginLeft: "17.5rem" }}>
            <img src={Logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <NavDropdown
                title={
                  <div>
                    <img
                      className="rounded-circle"
                      src={UserBlank}
                      alt="User"
                      style={{ width: "35px", marginTop: "15px" }}
                    />
                  </div>
                }
                id="nav-dropdown"
              >
                <NavDropdown.Item
                  bg="dark"
                  variant="dark"
                  style={{ backgroundColor: "black", color: "white" }}
                  as={Link}
                  to="/user/profile"
                >
                  <img
                    src={Profil}
                    alt="icon"
                    style={{ width: "25px", marginRight: "5px" }}
                  />
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  style={{ backgroundColor: "black", color: "white" }}
                  as={Link}
                  to="/user/upgrade"
                >
                  <img
                    src={Pay}
                    alt="icon"
                    style={{ width: "25px", marginRight: "5px" }}
                  />
                  Pay
                </NavDropdown.Item>
                <NavDropdown.Divider
                  style={{ backgroundColor: "grey", color: "white" }}
                />
                <NavDropdown.Item
                  onClick={logout}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <img
                    src={LogoutIcon}
                    alt="icon"
                    style={{ width: "25px", marginRight: "5px" }}
                  />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavbarUser;
