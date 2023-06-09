import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './ProfileButton.css'

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
            <button className="profile-button" onClick={openMenu}>
            <i class="fa-solid fa-bars fa-lg"></i>  <i class="fa-solid fa-person-running fa-2xl"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>

                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <li   className="manage-spots-button"
                                onClick={(e) => {
                                    history.push(`/spots/current`)
                                    closeMenu()
                                }}
                            >Manage Spots</li>


                        <li>
                            <button className="logout-button" onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <div className="log-in-sign-up">
                        <OpenModalMenuItem
                            itemText="Log In"
                            onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />}
                        />
                        <OpenModalMenuItem
                            itemText="Sign Up"
                            onItemClick={closeMenu}
                            modalComponent={<SignupFormModal />}
                        />
                    </div>
                )}
            </ul>
        </>
    );
}

export default ProfileButton;
