import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import User from "../../models/User";
import Layout from "../../components/Layout/Layout";

export default function LandingPage() {
    const { state } = useLocation();
    const [user] = useState<User>(state?.user);

    return user ?( 
    <Layout> <div>Hello, {user.email.split("@")[0]}</div></Layout>
     ) : (<Navigate to = "/register"  />
);
}