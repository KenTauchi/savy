import React from 'react';
import ContactUs from '../contact-us/ContactUs.component.js';

import logo from './logo-error-page.svg';


const NotFound = (props) => {

    const {style} = props;

    return (
        <div className="wm-notfound-content" style={style}>
            <div className="wm-notfound-wrapper">
                <div className="wmPageNotFound">
                    <img className="notFoundLogo" src={logo} alt="" />
                    <p className="wmPageNotFoundHead">Not Found!</p>
                    <p className="wmPageNotFoundMessage">Sorry! It seems we can't find what you are looking for. <br />Maybe if you search for similar name or zip code? <br />If the problem persists, please let us know.</p>
                </div>
            </div>
            <ContactUs />
        </div>
    );
}

export default NotFound;