import "./App.css";
import React, { useState, useCallback } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    Switch,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const login = useCallback(() => {
        setIsLoggedIn(true);
    });
    const logout = useCallback(() => {
        setIsLoggedIn(false);
    });
    var routes;

    if (isLoggedIn) {
        routes = (
            <React.Fragment>
                <Route path="/" element={<Users />} exact />
                <Route
                    path="/:userId/places"
                    element={<UserPlaces />}
                    exact
                ></Route>
                <Route path="/places/new" element={<NewPlace />} exact />
                <Route path="/places/:placeId" element={<UpdatePlace />} />
                <Route path="*" element={<Navigate to="/" />} />
            </React.Fragment>
        );
    } else {
        routes = (
            <React.Fragment>
                <Route path="/" element={<Users />} exact />
                <Route
                    path="/:userId/places"
                    element={<UserPlaces />}
                    exact
                ></Route>
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<Navigate to="/auth" />} />
            </React.Fragment>
        );
    }
    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
        >
            <div>
                <Router>
                    <MainNavigation />
                    <main>
                        <Routes>{routes}</Routes>
                    </main>
                </Router>
            </div>
        </AuthContext.Provider>
    );
};

export default App;
