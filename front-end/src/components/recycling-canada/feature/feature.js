import React from 'react';
import { useHistory } from 'react-router-dom';

const Feature = () => {
    const history = useHistory();

    return (
        <div className="feature-section">
            <div className="feature-section-info">
                <h2>
                    Help Canada have green and clean land.
                    <strong>Explore our educational and informative platform.</strong>
                </h2>

                <div className="feature-list">
                    <div className="feature">
                        <img className="feature-image" src="./images/icons/waste-management.svg" />
                        <span className="feature-name">Waste Management</span>
                        <span className="feature-info">
                            Find nearest locations for your recycling
                            materials along with the items they receive and
                            how to get in touch with them.
                        </span>
                        <button onClick={() => history.push("/waste-management")} className="feature-redirect-btn">Learn More</button>
                    </div>

                    <div className="feature">
                        <img className="feature-image" src="./images/icons/challenge.svg" />
                        <span className="feature-name">Challenges</span>
                        <span className="feature-info">
                            You can easily test your
                            knowledge and expertise in recycling and learn
                            new things with simple question and answer.
                        </span>
                        <button onClick={() => history.push("/challenges-rule")} className="feature-redirect-btn">Learn More</button>
                    </div>

                    <div className="feature">
                        <img className="feature-image" src="./images/icons/explore.svg" />
                        <span className="feature-name">Explore</span>
                        <span className="feature-info">
                            Find frequently asked questions and answers
                            and any related articles that can help you
                            expand your knowledge.
                        </span>
                        <button onClick={() => history.push("/explore")} className="feature-redirect-btn">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Feature;