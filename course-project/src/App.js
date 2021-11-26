import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
const App = () => {
    return (
        <div>
            <Router>
                <MainNavigation />
                <main>
                    <Routes>
                        <Route path="/" element={<Users />} exact />
                        <Route
                            path="/:userId/places"
                            element={<UserPlaces />}
                            exact
                        ></Route>
                        <Route
                            path="/places/new"
                            element={<NewPlace />}
                            exact
                        />
                        <Route
                            path="/places/:placeId"
                            element={<UpdatePlace />}
                        />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </Router>
        </div>
    );
};

export default App;
