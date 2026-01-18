import { Route } from "react-router-dom"
import {
    Dashboard,
    MyProfile,
    Contests,
    LiveContest,
    GroupContestLobby,
    Collections,
    Message,
    CollectionQuestions,
    PrivateContestLobby
} from '../../pages'

export const ProtectedRoutes = (
    <>
        <Route path="/user/dashboard" element = { <Dashboard/> }/>
        <Route path="/user/profile" element = { <MyProfile/> }/>
        <Route path="/user/contests" element = { <Contests/> }/>
        <Route path="/user/contests/live" element = { <LiveContest/> }/>
        <Route path="/user/contests/public" element = { <GroupContestLobby/> }/>
        <Route path="/user/contests/private" element = { <PrivateContestLobby/> }/>

        <Route path="/user/collections" element = { <Collections/> }/>
        <Route path="/user/messages" element = { <Message/> }/>
        <Route path="/user/collection/questions" element = { <CollectionQuestions/> }/>
    </>
)