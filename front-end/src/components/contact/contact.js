import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

import "./contact.scss";

class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        };
   
    }

    contactSubmit(event) {
        const nameValue= event.target.name.value;
        const emailValue = event.target.email.value;
        const messageValue = event.target.message.value;

        alert("Message Sent Successfully" +nameValue);

        // Prevent for going on another page by default
        event.preventDefault();
    }

    render() {
        return (
            <div>
            <Header />
                <h2>If there is any question or feedback, feel free to reach out to us.</h2>
      
            <div className="contact-section">
                <div className="contact-img">
                    <img src="./images/contact.jpeg"></img>
                </div>
                
                <div className="contact-content">
                
                <h3>Contact Us</h3>
                
                <form id="contact-form" method="POST" onSubmit={this.contactSubmit}>
                    
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name"/>
    
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"/>
                    
                    <label htmlFor="message">Message</label>
                    <textarea name="message" rows="3"></textarea>
                    
                    <input type="submit" value="Submit" />
                </form>
                
                </div>
            </div>
        
            <Footer />
          </div>
        );
    }
}

export default Contact;