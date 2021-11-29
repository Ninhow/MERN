import React, { useState, useContext } from "react";
import Input from "../../shared/FormElements/Input";
import Button from "../../shared/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";
import Card from "../../shared/UIElements/Card";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/context/auth-context";
const Auth = (props) => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formState, inputHandler, setFormData] = useForm(
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

    const SwitchModeHandler = (event) => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: "",
                        isValid: false,
                    },
                },
                false
            );
        }
        setIsLoginMode((prevMode) => !prevMode);
    };

    const authSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    };
    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input
                        element="input"
                        id="name"
                        type="text"
                        label="Your Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a name"
                        onInput={inputHandler}
                    />
                )}
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
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
            </form>
            <Button inverse onClick={SwitchModeHandler}>
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    );
};
export default Auth;
