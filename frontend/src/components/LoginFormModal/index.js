import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password }))
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    const demoUser = () => {
        let credential = 'optimusprime'
        let password = 'password'
        return dispatch(sessionActions.login({ credential, password })).then(closeModal)
    }


    const disabled = (credential, password) => credential.length >= 4 && password.length >= 6 ? false : true;

    const disabledFuncReturn = disabled(credential, password);

    return (
        <div className="login-container">
            <h1>Log In</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="label">

                    <input
                     className="user-form-input"
                    placeholder="Username or Email"
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <label className="label">

                    <input
                     className="user-form-input"
                    placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.credential && (
                    <p className="display-errors">{errors.credential}</p>
                )}
                <button type="submit" disabled={disabledFuncReturn} className='login-btn'>Log In</button>
            </form>
                <p className="demo-user" onClick={demoUser}>Log In as Demo User</p>
        </div>
    );
}

export default LoginFormModal;
