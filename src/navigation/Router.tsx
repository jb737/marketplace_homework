import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";


const routes = createRoutesFromElements( 
        <>
        <Route path = "/sign-up" element = {<SignUpPage />} />
        <Route path = "/" element = {<div>Home Page</div>}/>
        <Route path = "*" element = {<div>{<NotFoundPage />}</div>}/>
        </>
);

const router = createBrowserRouter(routes)

export default router;

