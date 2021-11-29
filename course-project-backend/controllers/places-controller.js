const HttpError = require("../models/http-error");

const { validationResult } = require("express-validator");
const { getCoordsForAdress } = require("../utils/location");
DUMMY_PLACES = [
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
        description: "Famous place!!!!!!!!!!!!!!!",
        imageUrl: "https://image.posterlounge.se/images/l/1886489.jpg",
        adress: "20 W 34th St, New York, NY 10001, USA",
        location: {
            lat: 40.7484445,
            lng: -73.9878531,
        },
        creator: "u2",
    },
];

const getPlacesById = (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.filter((place) => {
        return place.id === placeId;
    });
    if (!place || place.length === 0) {
        throw new HttpError("Could not find places for the provided id.", 404);
    }
    res.status(200).json({ place });
};

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter((p) => {
        return p.creator === userId;
    });

    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find a user for the provided id.", 404)
        );
    }
    res.json({ places });
};

const createPlace = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }
    const { title, description, adress, creator } = req.body;

    let coordinates;
    try {
        coordinates = getCoordsForAdress(adress);
    } catch (error) {
        return next(error);
    }
    const createdPlace = {
        title,
        description,
        location: coordinates,
        adress,
        creator,
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(200).json({ places: DUMMY_PLACES });
};

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        throw new HttpError(
            "Invalid inputs passed, please check your data.",
            422
        );
    }
    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {
        ...DUMMY_PLACES.find((place) => {
            return place.id == placeId;
        }),
    };

    const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({ place: updatedPlace });
};
const deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
        throw new HttpError("Could not find a place for that id", 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
    res.status(200).json({ message: "Deleted place." });
};

exports.getPlacesById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
