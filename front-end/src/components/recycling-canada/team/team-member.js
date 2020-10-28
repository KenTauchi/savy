import React from 'react';

const TeamMember = (props) => {
    return (
        <div className="team-member-info">
            <img src={"./images/" + props.imageSRC} />
            <div className="member-info">
                <p>{props.memberName}</p>
                <p>{props.memberRole}</p>
                <p>{props.linkedIn}</p>
                <p>{props.gitHub}</p>
                <p>{props.behance}</p>
            </div>
        </div>
    );
}

export default TeamMember;