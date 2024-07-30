import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";


const routes = createRoutesFromElements( 
        <>
        <Route path = "/register" element = {<SignUpPage />} />
        <Route path = "/login" element = {<LoginPage />} />
        <Route path = "/" element = {<div><LandingPage /></div>}/>
        <Route path = "*" element = {<div>{<NotFoundPage />}</div>}/>
        </>
);

const router = createBrowserRouter(routes)

export default router;

