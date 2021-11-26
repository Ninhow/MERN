import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../../shared/FormElements/Button";

import Input from "../../shared/FormElements/Input";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
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
const UpdatePlace = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true,
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true,
                    },
                },
                true
            );
        }

        setIsLoading(false);
    }, [setFormData, identifiedPlace]);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    const placeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };
    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        );
    }
    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            ></Input>
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.title.isValid}
            ></Input>
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
};

export default UpdatePlace;
