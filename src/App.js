import React from 'react';
import './App.css';

import "./assets/css/all.css"
import "./assets/css/bootstrap.min.css"
import "./assets/css/boxicons.min.css"
import "./assets/css/bootstrap-icons.css"
import "./assets/css/jquery-ui.css"
import "./assets/css/slick-theme.css"
import "./assets/css/slick.css"
import "./assets/css/nice-select.css"
import "./assets/css/magnific-popup.css"
import "./assets/css/odometer.css"
import "./assets/css/style.css"
import 'react-notifications/lib/notifications.css';

import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
// import Enchere from "./pages/enchere/Enchere";
// import Account from "./pages/dashboard/Account";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AddAuction from "./pages/AddAuction";
import Rechargement from "./pages/account/Rechargement";

function App() {
    const handleSendNotification = () => {
        return;
    };

    const handleSetTheAlarm = () => {
        return;
    };

    return (
        <div>

            <Routes>
                {/*<Route path={"/encheres"} element={<Enchere/>} />*/}
                <Route path={"/home"} element={<Home/>}/>
                <Route path={"/add-auction"} element={<AddAuction/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/recharge-compte"} element={<Rechargement/>}/>
                <Route path={"/"} element={<Login/>}/>
            </Routes>
        </div>
    );
}

export default App;
