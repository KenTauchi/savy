import React from 'react';

import { useHistory } from 'react-router-dom';

const ContactUs = () => {

	const history = useHistory();

	return (
		<div className="contact-us-section">
			<p>
				DID SOMETHING PIQUE YOUR INTERESTS? EXCELLENT! <span> LET'S TALK MORE</span>
			</p>
			<button onClick={() => history.push("/contact")} className="button savy-green-button contact-us-btn">Contact Us</button>
		</div>
	);
}

export default ContactUs;
