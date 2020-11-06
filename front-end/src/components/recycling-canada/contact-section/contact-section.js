import React from 'react';
import { useHistory } from 'react-router-dom';

const ContactSection = () => {
    const history = useHistory();
    return (
        <div className="home-contact-section">
            <h3>Drop us a line and we'll get back as fast as we can!</h3>
            <button onClick={() => history.push("/contact")} className="contact-us-btn">Contact Us</button>
        </div>
    );
}

export default ContactSection