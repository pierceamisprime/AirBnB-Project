import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul className='nav'>
            <li className='home'>
                <NavLink className='link-home' exact to="/"><i class="fa-solid fa-dumbbell fa-2xl" style={{color: "#FF5A5F",}} />   FitBnB</NavLink>
            </li>
            <li className='create-spot'>
            {sessionUser ?  <NavLink className= 'link-new' to='/spots/new'>Create a New Spot</NavLink> : null}
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
