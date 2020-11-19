import React, { useState } from "react";
import axios from "axios";
import FloatingLabelInput from "react-floating-label-input";



/* Install these two libraries for Floating Input 
    npm i react-floating-label-input
    npm i styled-components
*/


const Contact = () => {

    // Server State Handling
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
        // displayForm:false
    });


    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
            // displayForm:false
        });

        if (ok) {
            form.reset();
            // setServerState({
            //     displayForm:true
            // });
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

    // Form hidden 
    // className={serverState.submitting ? {display: 'none'} : ""} 
    console.log("Check status", serverState.displayForm);
    return (
        <div className="contact-page main-content">
            <div className="contact-main">


                <div className="contact-section">
                    <h2>If there is any question or feedback, feel free to reach out to us.</h2>
                    <div className="contact-img">
                        <img src="./images/contact.svg" />
                    </div>

                    <div className="contact-content">
                        <h3>Contact Us</h3>


                        <form onSubmit={handleOnSubmit}>

                            <FloatingLabelInput
                                className="floating-input"
                                type="text"
                                name="name"
                                label="Name"
                            />

                            <FloatingLabelInput
                                className="floating-input"
                                type="email"
                                name="email"
                                label="Email"
                                required
                            />

                            <FloatingLabelInput
                                className="floating-input"
                                type="text"
                                name="message"
                                label="Message"
                                required
                            />

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