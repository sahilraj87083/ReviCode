import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "../Layout";
import {PublicRoutes}  from "./PublicRoutes/Public.routes";
import { ProtectedRoutes } from "./ProtectedRoutes/Protected.routes";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element = {<Layout/>}>
            {PublicRoutes}
            {ProtectedRoutes}
        </Route>
    )
)
