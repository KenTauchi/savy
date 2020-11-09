import React from 'react';
import * as FAIcons from "react-icons/fa";

const TeamMember = (props) => {
    return (
        <div className="team-member-info">
            <img src={"./images/" + props.imageSRC} />
            <div className="member-info">
                <p>{props.memberName}</p>
                <p>{props.memberRole}</p>
                <p className="member-profile">
                    {props.linkedIn != "" ? <a href={props.linkedIn} style={{color:"#0E76A8"}} target="_blank"><FAIcons.FaLinkedin /></a> : ""}
                    {props.gitHub != "" ? <a href={props.gitHub} style={{color:"#7DBBE6"}} target="_blank"><FAIcons.FaGithubSquare /></a> : ""}
                    {props.behance != "" ? <a href={props.behance} style={{color:"#053EFF"}} target="_blank"><FAIcons.FaBehanceSquare /></a> : ""}
                </p>
            </div>
        </div>
    );
}

export default TeamMember;