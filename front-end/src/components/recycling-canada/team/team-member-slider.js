import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { initialState } from "../../../reducks/store/initialState";
import { teamImportAction } from "../../../reducks/teamMembers/action";
import { getTeamMembers } from "../../../reducks/teamMembers/selectors";
import Slider from "react-slick";
import TeamMember from './team-member';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { API_URL } from '../../global_variables';

export default function CenterMode() {
    const selector = useSelector((state) => state);
    const teamMembers = getTeamMembers(selector);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}/team`)
            .then(response => response.json())
            .then((result) => {
                dispatch(teamImportAction(result));
            })
            .catch(() => null);
    }, []);

    // Slick Slider Setting
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 7,
        speed: 500,
        arrows: true,
        focusOnSelect: true,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
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
                breakpoint: 660,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    return (
        <div>
            {/* Loading Dynamic Data to the slides */}
            <Slider {...settings}>
                {teamMembers.data.map((teamMember, index) => {
                    return (
                        <TeamMember key={index} imageSRC={teamMember.imageURL} memberName={teamMember.name} memberRole={teamMember.role} linkedIn={teamMember.linkedinURL} gitHub={teamMember.githubURL} behance={teamMember.behanceURL} />
                    );
                })}
            </Slider>
        </div>
    );
}