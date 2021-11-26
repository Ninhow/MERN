import React from "react";

import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id: "u1",
            name: "Max test",
            image: "https://metromode.se/files/2017/09/framgang8151.jpg",
            places: 3,
        },
    ];
    return <UsersList items={USERS} />;
};

export default Users;
