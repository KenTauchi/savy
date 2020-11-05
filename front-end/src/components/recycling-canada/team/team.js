import React from 'react';
import CenterMode from './team-member-slider';
// import './team.scss';

const Team = () => {
    return (
        <div className="team-section">
            <div className="team-section-info">
                <h2>Meet the team.</h2>
                <p>From high-level strategy & creative thinking to pixel-perfect execution & performance, we do our best to add value to your brand & identity. We think big & out of the box. We bring ideas to life with design & development experiences & story telling that make users happy and satisfied.</p>
            </div>
            
            <div className="team-member-slider">
                <CenterMode />
            </div>
        </div>
    );
}

export default Team;