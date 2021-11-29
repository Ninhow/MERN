const express = require("express");
const placesController = require("../controllers/places-controller");

const { check } = require("express-validator");
const router = express.Router();

router.get("/:pid", placesController.getPlacesById);

router.get("/user/:uid", placesController.getPlaceByUserId);

router.post(
    "/",
    [
        check("title").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("adress").not().isEmpty(),
    ],
    placesController.createPlace
);

router.patch(
    "/:pid",
    [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
    placesController.updatePlaceById
);

router.delete("/:pid", placesController.deletePlaceById);
module.exports = router;
