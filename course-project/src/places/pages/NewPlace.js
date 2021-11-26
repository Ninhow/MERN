import React from "react";

import "./PlaceForm.css";

import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewPlace = () => {
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: "",
                isValid: false,
            },
            description: {
                value: "",
                isValid: false,
            },
            adress: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const placeSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs); //Send to backend
    };

    return (
        <form className="place-form" onSubmit={placeSubmitHandler}>
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title!"
                onInput={inputHandler}
            ></Input>
            <Input
                id="description"
                element="textarea"
                type="text"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (at least 5 characters)!"
                onInput={inputHandler}
            ></Input>
            <Input
                id="adress"
                element="input"
                type="text"
                label="Adress"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid description (at least 5 characters)!"
                onInput={inputHandler}
            ></Input>
            <Button type="submit" disabled={!formState.isValid}>
                ADD PLACE
            </Button>
        </form>
    );
};

export default NewPlace;
