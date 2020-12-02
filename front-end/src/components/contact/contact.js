import React, { useState } from "react";
import axios from "axios";

const Contact = () => {

    // Server State Handling
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    });


    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });

        if (ok) {
            form.reset();
        }
    }

    const handleOnSubmit = event => {
        event.preventDefault();
        const form = event.target;
        setServerState({ submitting: true });

        axios({
            method: "POST",
            url: "https://formspree.io/f/xyybjnnl",
            data: new FormData(form)

        })

            .then(r => {
                handleServerResponse(true, "Thanks You!  We will reply by email as soon as possible.", form);
            })

            .catch(r => {
                handleServerResponse(false, r.response.data.error, form);
            });

    }

    console.log("Check status", serverState.displayForm);
    return (
        <div className="contact-page main-content">
            <div className="contact-main">


                <div className="contact-section">
                    
                    <img className="contact-img" src="./images/contact.svg" />

                    <div className="contact-content">

                        <h2>If there is any question or feedback, <span>feel free to reach out to us.</span></h2>
                        <form className="contact-form" onSubmit={handleOnSubmit}>

                            <div className="contact-input-field">
                                <label for="name">Name</label>
                                <input
                                    className="contact-input"
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                />
                            </div>

                            <div className="contact-input-field">
                                <label for="email">Email</label>
                                <input
                                    className="contact-input"
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                />
                            </div>

                            <div className="contact-input-field">
                                <label for="message">Message</label>
                                <textarea 
                                    className="contact-input"
                                    type="text"
                                    name="message"
                                    id="message"
                                    required 
                                    rows="6">
                                </textarea>
                            </div>

                            <div className="contact-button">
                                <button type="submit" disabled={serverState.submitting} className="savy-green-button contact-form-submit-btn">
                                    Submit
                                </button>
                            </div>

                        </form>

                        {serverState.status && (
                            <p id="submit-message" className={!serverState.status.ok ? "errorMsg" : ""}>
                                {serverState.status.msg}
                            </p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}


export default Contact;