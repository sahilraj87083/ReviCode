import { Route } from "react-router-dom";
import {
    Register,
    Home,
    Login,
    Explore
}
from '../../pages'

export const PublicRoutes = (
    <>
        <Route index element = {<Home/>} />
        <Route path="/user/register" element = { <Register/> }/>
        <Route path="/user/login" element = { <Login/> }/>
        <Route path="/explore" element = { <Explore/> }/>
    </>
)