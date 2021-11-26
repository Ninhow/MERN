import React from "react";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
const Auth = (props) => {
    const [formState, inputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
            password: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
    };
    return (
        <Card>
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                <Input
                    id="email"
                    label="E-mail"
                    type="email"
                    element="input"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email adress."
                    onInput={inputHandler}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    element="input"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, atleast 5 characters."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    LOGIN
                </Button>
            </form>
        </Card>
    );
};
export default Auth;
