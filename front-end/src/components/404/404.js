import React from "react";
import { Link } from 'react-router-dom';

const ErrorPage = () => {
	return (
		<div className="errorMain-Section main-content">
			<div className="error-Section">
				<div className="notFound-section">
					<img className="error-logo" src="./logo-error-page.svg" />
					<div className="notFound-content">
						<h2>Not Found!</h2>
						<p>Sorry, the page you are looking for cannot be found. </p>
						<p>You can return to <Link to="/" className="not-found-redirect">Homepage</Link> or <Link to="/contact" className="not-found-redirect">Contact Us</Link> if you can’t find what you’re looking for.</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default ErrorPage;