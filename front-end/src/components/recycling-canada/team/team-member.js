import React from 'react';
import * as FAIcons from "react-icons/fa";

const TeamMember = (props) => {
    let borderColor = "";
    switch (props.memberName) {

        case 'Vinicius Meyer Lana':
        case 'Roujyar Darvish':
        case 'Navneet Kaur':
        case 'Hardikkumar Vasoya':
            borderColor = "#EE655B";
            break;

        case 'Hiteshri Nanda':
        case 'Shentario Nikogiani':
        case 'Bhumili Kalra':
            borderColor = "#EB9E3F";
            break;

        case 'Ken Tauchi':
        case 'Tomohiro Yoshida':
        case 'Jaqueline Santos':
        case 'Gurvinder Singh':
            borderColor = '#05C4A3';
            break;
    }

    return (
        <div className="team-member-info">
            <img src={"./images/" + props.imageSRC} />
            <div className="member-info" style={{ borderColor: borderColor }}>
                <p className="member-name">{props.memberName}</p>
                <p className="member-role" style={{ borderColor: borderColor }}>{props.memberRole}</p>
                <p className="member-profile">
                    {(props.linkedIn != "" && props.linkedIn != null)  ? <a href={props.linkedIn} style={{ color: "#0E76A8" }} target="_blank"><FAIcons.FaLinkedin /></a> : ""}
                    {(props.gitHub != "" && props.gitHub != null) ? <a href={props.gitHub} style={{ color: "#7DBBE6" }} target="_blank"><FAIcons.FaGithubSquare /></a> : ""}
                    {(props.behance != "" && props.behance != null) ? <a href={props.behance} style={{ color: "#053EFF" }} target="_blank"><FAIcons.FaBehanceSquare /></a> : ""}
                </p>
            </div>
        </div>
    );
}

export default TeamMember;