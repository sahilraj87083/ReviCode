import { Route } from "react-router-dom"
import {
    Dashboard,
    MyProfile,
    Contests,
    LiveContest,
    GroupContest,
    Collections,
    Message,
    CollectionQuestions
} from '../../pages'

export const ProtectedRoutes = (
    <>
        <Route path="/user/dashboard" element = { <Dashboard/> }/>
        <Route path="/user/profile" element = { <MyProfile/> }/>
        <Route path="/user/contests" element = { <Contests/> }/>
        <Route path="/user/contests/live" element = { <LiveContest/> }/>
        <Route path="/user/contests/public" element = { <GroupContest/> }/>
        <Route path="/user/collections" element = { <Collections/> }/>
        <Route path="/user/messages" element = { <Message/> }/>
        <Route path="/user/collection/questions" element = { <CollectionQuestions/> }/>
    </>
)