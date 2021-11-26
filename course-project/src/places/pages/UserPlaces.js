import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
const UserPlaces = (props) => {
    const DUMMY_PLACES = [
        {
            id: "p1",
            title: "Empire state Building",
            description: "Famous place",
            imageUrl: "https://image.posterlounge.se/images/l/1886489.jpg",
            adress: "20 W 34th St, New York, NY 10001, USA",
            location: {
                lat: 40.7484445,
                lng: -73.9878531,
            },
            creator: "u1",
        },
        {
            id: "p2",
            title: "Emp. state Building",
            description: "Famous place",
            imageUrl: "https://image.posterlounge.se/images/l/1886489.jpg",
            adress: "20 W 34th St, New York, NY 10001, USA",
            location: {
                lat: 40.7484445,
                lng: -73.9878531,
            },
            creator: "u2",
        },
    ];

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter((place) => {
        return place.creator === userId;
    });
    return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
