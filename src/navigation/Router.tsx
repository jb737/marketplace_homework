import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";

import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Layout from "../components/Layout/Layout";
import ShopPage from "../pages/ShopPage/ShopPage";


const routes = createRoutesFromElements( 
<>
        <Route path = "/" element = {<Layout />}>
                <Route index element = {<LandingPage />} />
                <Route path = "shop" element = {<ShopPage />} />
        </Route>

        <Route path = "/account">
                <Route path = "register" element = {<SignUpPage />} />
                <Route path = "login" element = {<LoginPage />} />
        </Route>
                  
        <Route path = "*" element = {<NotFoundPage />} />
</>
);

const router = createBrowserRouter(routes)

export default router;

