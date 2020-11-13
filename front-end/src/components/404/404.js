import React from "react";
import { useHistory } from 'react-router-dom';

const ErrorPage = () => {
    const history = useHistory();

    return (
        <div className="errorMain-Section">

            <div className="error-Section">
                <div className="main-primary">
                    <h2>Recycling Search by Savy</h2>
                    <p>Search recycling solutions near you and get to know more about material that can be recycled.</p>
                </div>
                <div className="notFound-section">
                    <div className="error-logo">
                        <img src="./logo-error-page.svg" />
                    </div>
                    <div className="notFound-content">
                        <h1>Not Found!</h1>
                        <p>Sorry, it seems we can't find what you are looking for. Maybe if you search for similar name or zip code? If the problem persists, please let us know.</p>
                    </div>
                </div>
            </div>

            <div className="contact-button">
                <button onClick={() => history.push("/")}>
                    Return to Home
            </button>
            </div>

        </div>
    )
}
export default ErrorPage;