import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors({});
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )   .then(() => history.push('/'))
                .then(closeModal)
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors);
                    }
                });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };


    const checkInputs = () => {
        const inputs = [email, username, firstName, lastName, password, confirmPassword];

        for (let i = 0; i < inputs.length; i++) {
          const input = inputs[i];

          if(!input.length) return true
        }
        return false;
      }

      const disabledBtn = checkInputs();
      const isDisabled = checkInputs() ? "signup-btn-disabled-btn" : "signup-btn-btn";

    return (
        <>
            <h1 className="sign-up-text">Sign Up</h1>
            <form className="sign-up" onSubmit={handleSubmit}>
                <label>

                    <input
                    placeholder="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                {errors.email && <p className='display-errors-signup'>{errors.email}</p>}
                <label>

                    <input
                    placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                {errors.username && <p className='display-errors-signup'>{errors.username}</p>}
                <label>

                    <input
                    placeholder="First Name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                {errors.firstName && <p className='display-errors-signup'>{errors.firstName}</p>}
                <label>

                    <input
                    placeholder="Last Name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                {errors.lastName && <p className='display-errors-signup'>{errors.lastName}</p>}
                <label>

                    <input
                    placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.password && <p className='display-errors-signup'>{errors.password}</p>}
                <label>

                    <input
                    placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                {errors.confirmPassword && (
                    <p className='display-errors-signup'>{errors.confirmPassword}</p>
                )}
                 <button className={isDisabled} disabled={disabledBtn}  type="submit">Sign Up</button>
            </form>
        </>
    );
}

export default SignupFormModal;
