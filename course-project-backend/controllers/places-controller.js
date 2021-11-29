const HttpError = require("../models/http-error");
const uuid = require("uuid").v4;

const { validationResult } = require("express-validator");
const { getCoordsForAdress } = require("../utils/location");
const mongoose = require("mongoose");

const Place = require("../models/place");
const User = require("../models/user");
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

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = next(new HttpError("Could not find place with id", 500));
        return next(error);
    }
    if (!place) {
        const error = HttpError(
            "Could not find places for the provided id.",
            404
        );
        return next(error);
    }
    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator: userId });
    } catch (err) {
        const error = next(
            new HttpError("Could not find any places for this user", 500)
        );
        return next(error);
    }
    console.log(places);

    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find a user for the provided id.", 404)
        );
    }
    res.json({
        places: places.map((place) => place.toObject({ getters: true })),
    });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = getCoordsForAdress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
        creator,
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch (err) {
        const error = new HttpError(
            "Creating place failed, please try again",
            500
        );
        return next(error);
    }

    if (!user) {
        const error = new HttpError("Could not find user for provided id", 404);
        return next(error);
    }

    try {
        await createdPlace.save();
        user.places.push(createdPlace);
        await user.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Creating place failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
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

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update place.",
            500
        );
        return next(error);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not update place.",
            500
        );
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
};
const deletePlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId).populate("creator");
    } catch (err) {
        const error = new HttpError(
            "Something went wrong, could not delete place.",
            500
        );
        return next(error);
    }
    if (!place) {
        const error = new HttpError("Could not find place for this id", 404);
        return next(error);
    }

    try {
        await place.remove();
        place.creator.places.pull(place);
        await place.creator.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError(
            "Something went wrong, could not delete place.",
            500
        );
        return next(error);
    }

    res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
