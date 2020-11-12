import React from 'react';

import DefaultButton from '../button/Button.component';

import { useHistory } from 'react-router-dom';

// import './ExploreQuiz.style.scss';

const ContactUs = () => {

  const history = useHistory();

  const moveToContact = () => {
    history.push("/contact");
    window.scrollTo(0, 0);
  }

  return (
    <div className="contact-us-section">
      <p>
        DID SOMETHING PIQUE YOUR INTERESTS ? EXCELLENT! <span> LET'S TALK MORE</span>
      </p>
      <DefaultButton
        click={moveToContact}
        text="Contact Us"
      />
    </div>
  );
}

export default ContactUs;

// DID SOMETHING PIQUE YOUR INTERESTS ? EXCELLENT! < span > LET'S TALK MORE</span>
//         </p >
//   <button>Contact Us</button>
