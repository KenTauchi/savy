import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TeamMember = (props) => {
    return (
        <div className="team-member-info">
            <img src={"./images/" + props.imageSRC} />
            <div className="member-info">
                <p>{props.memberName}</p>
                <p>{props.memberRole}</p>
                <p className="member-profile">{props.linkedIn != "" ? <a href={props.linkedIn}><FontAwesomeIcon icon={['fab', 'linkedin']} size="2x" /></a> : ""}
                {props.gitHub != "" ? <a href={props.gitHub}><FontAwesomeIcon icon={['fab', 'github']} size="2x" /></a> : ""}
                {props.behance != "" ? <a href={props.behance}><FontAwesomeIcon icon={['fab', 'behance']} size="2x" /></a> : ""}</p>
            </div>
        </div>
    );
}

export default TeamMember;