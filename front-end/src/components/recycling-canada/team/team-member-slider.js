import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../../../reducks/store/initialState";
import { teamImportAction } from "../../../reducks/teamMembers/action";
import { getTeamMembers } from "../../../reducks/teamMembers/selectors";
import Slider from "react-slick";
import TeamMember from './team-member';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./team.scss";

export default function CenterMode() {
// export default class CenterMode extends Component {
    // render() {
        const selector = useSelector((state) => state);
        const teamMembers = getTeamMembers(selector);
        const dispatch = useDispatch();

        useEffect(() => {
            fetch('http://localhost:3000/api/v1/team')
                .then(response => response.json())
                .then((result) => {
                    console.log(result)
                    dispatch(teamImportAction(result));
                })
                .catch(() => null);
        }, []);

        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "0px",
            slidesToShow: 7,
            speed: 500,
            arrows: true,
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 1367,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };
        return (
            <div>
                <h2> Center Mode</h2>
                <Slider {...settings}>
                    {teamMembers.data.map((teamMember, index) => {
                        // {
                        //     switch(teamMember.imageURL) {
                        //         case "bhumili.jpg":
                        //             teamMember.imageURL = "bhumili.jpg"
                        //           return 'bar';
                        //         default:
                        //           return 'foo';
                        //       }
                        // }
                        return (
                            
                            <TeamMember key={index} imageSRC={teamMember.imageURL} memberName={teamMember.name} memberRole={teamMember.role} linkedIn={teamMember.linkedinURL} gitHub={teamMember.githubURL} behance={teamMember.behanceURL}/>
                        );
                    })}
                </Slider>
            </div>
        );
    // }
}