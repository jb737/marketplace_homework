import { useState } from "react";
import { Navbar, Container, Nav} from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";

import { MdOutlineShoppingCart } from "react-icons/md";
import { RiAuctionLine } from "react-icons/ri";
import { TiMessages } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";

import classes from "./Layout.module.css"


export default function Layout() {
    const [theme] = useState(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "");

    return (
   
        <div className = {classes.page_container}  data-theme = {theme}>
            <Navbar expand = "lg" className = {classes.navbar}>
        <Container>
        <Link to = "/">
            {" "}
            <img
              src = "src/Assets/shopping-bag.png"
              width = "30"
              height = "30"
              className = "d-inline-block align-top"
              alt = "MERN Shop logo"
            />
        </Link>

        <Navbar.Toggle aria-controls = "basic-navbar-nav" />

        <Navbar.Collapse id = "basic-navbar-nav">
          <Nav className = {classes.nav_item_container+ " me-auto"}>
            <NavLink to = "/shop">
            <MdOutlineShoppingCart />Shop</NavLink>
            <NavLink to = "/posts">
            <RiAuctionLine />My Posts</NavLink>
            <NavLink to = "/messages">
            <TiMessages />Messages</NavLink>
          </Nav>
          <Nav  className = {classes.nav_item_container}>
            <NavLink to = "/settings" >
            <IoSettingsOutline />Settings</NavLink>
            <NavLink to = "/account/login" >
            <CiLogout />Log Out</NavLink>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <Container fluid><Outlet /></Container>
  
  </div>
  );
}