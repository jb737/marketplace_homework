import { useContext } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";

import { RiAuctionLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { CiLogout } from "react-icons/ci";

import { ColorThemeContext } from "../../contexts/ColorThemeContext";
import { UserContext } from "../../contexts/UserContext";
import classes from "./Layout.module.css";


export default function Layout() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { theme, setTheme } = useContext(ColorThemeContext);

    const onLogoutClickHandler = () => {
      setUser(undefined);
      navigate("/account/login");
    };

    return user ? (
   
    <div className = {classes.page_container}>
      <Navbar expand = "lg" className = {classes.navbar}>
        <Container fluid>
        <Link to = "/">
            {" "}
            <img
              src = "src/Assets/shopping-bag.png"
              width = "30"
              height = "30"
              className = "d-inline-block align-top"
              alt = "MERN Shop logo"
              title = "Return to Product Listings"
            />
        </Link>

      <Navbar.Toggle aria-controls = "basic-navbar-nav" />

      <Navbar.Collapse id = "basic-navbar-nav">
          <Nav className = {classes.nav_item_container+ " me-auto"}>
            <NavLink to = "/myProducts">
            <RiAuctionLine />My Products</NavLink>
            <NavLink to = "/messages">
            <TiMessages />Messages</NavLink>
          </Nav>
          <Nav  className = {classes.nav_item_container}>
          <Form.Check // prettier-ignore
            className = {classes.switch}
            type="switch"
            id="custom-switch"
            label="Dark Mode"
            checked = {theme === "dark"}
            onChange = {() => setTheme (theme === "dark" ? "" : "dark")}
      />
            <button onClick = {onLogoutClickHandler} >
            <CiLogout />Log Out</button>

          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    
    <Container fluid><Outlet /></Container>
  
  </div>
  ) : (<Navigate to = "/account/login" />
  );
}