import { useContext } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";

import { RiAuctionLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import { UserContext } from "../../contexts/UserContext";
import classes from "./Layout.module.css";

export default function Layout() {
    const navigate = useNavigate();

   
    const { user, setUser } = useContext(UserContext);

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
            <NavLink to = "/settings" >
            <IoSettingsOutline />Settings</NavLink>
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