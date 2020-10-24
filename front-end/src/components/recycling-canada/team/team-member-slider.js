import React, { Component } from "react";
import Slider from "react-slick";
import TeamMember from './team-member';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./team.scss";

export default class CenterMode extends Component {
    render() {
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
                    <TeamMember imageSRC="tomohiro-yoshida.jpeg" memberName="Tomohiro Yoshida" memberRole="Full Stack Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="hardikkumar-vasoya.jpeg" memberName="Hardikkumar Vasoya" memberRole="Full Stack Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="ken-tauchi.jpeg" memberName="Ken Tauchi" memberRole="Lead Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="vinicius-lana.jpeg" memberName="Vinicius Meyer Lana" memberRole="Project Manager" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="hiteshri-nanda.jpeg" memberName="Hiteshri Nanda" memberRole="Lead Designer" linkedIn="LinkedIn" behance="Behnace" />
                    <TeamMember imageSRC="shen-gianni.jpeg" memberName="Shen Gianni" memberRole="UI/UX Designer" linkedIn="LinkedIn" behance="Behnace" />
                    <TeamMember imageSRC="jaqueline-santos.jpeg" memberName="Jaqueline Santos" memberRole="UI/UX Designer" linkedIn="LinkedIn" behance="Behnace" />
                    <TeamMember imageSRC="tomohiro-yoshida.jpeg" memberName="Tomohiro Yoshida" memberRole="Full Stack Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="hardikkumar-vasoya.jpeg" memberName="Hardikkumar Vasoya" memberRole="Full Stack Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="ken-tauchi.jpeg" memberName="Ken Tauchi" memberRole="Lead Developer" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="vinicius-lana.jpeg" memberName="Vinicius Meyer Lana" memberRole="Project Manager" linkedIn="LinkedIn" gitHub="gitHub" />
                    <TeamMember imageSRC="hiteshri-nanda.jpeg" memberName="Hiteshri Nanda" memberRole="Lead Designer" linkedIn="LinkedIn" behance="Behnace" />
                    <TeamMember imageSRC="shen-gianni.jpeg" memberName="Shen Gianni" memberRole="UI/UX Designer" linkedIn="LinkedIn" behance="Behnace" />
                    <TeamMember imageSRC="jaqueline-santos.jpeg" memberName="Jaqueline Santos" memberRole="UI/UX Designer" linkedIn="LinkedIn" behance="Behnace" />
                </Slider>
            </div>
        );
    }
}