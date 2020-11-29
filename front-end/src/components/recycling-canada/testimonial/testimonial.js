import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { initialState } from "../../../reducks/store/initialState";
import { testimonialImportAction } from "../../../reducks/testimonials/action";
import { getTestimonials } from "../../../reducks/testimonials/selectors";
import SwiperCore, { Pagination } from "swiper";
import "../../../../node_modules/swiper/swiper-bundle.css";
import "../../../../node_modules/swiper/swiper.scss";

import { API_URL } from '../../global_variables';

SwiperCore.use([Pagination]);

const Testimonial = () => {
	const selector = useSelector((state) => state);
	const testimonials = getTestimonials(selector);
	const dispatch = useDispatch();

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	useEffect(() => {
		console.log("Testimonial API data fetch rendered");

		fetch(`${API_URL}/testimonials`)
			.then((response) => response.json())
			.then((result) => {
				dispatch(testimonialImportAction(result));
			})
			.catch(() => null);
	}, []);

	return (
		<div className="testimonial-section">
			<div className="teastimonial-slider">

				<Swiper
					id="main"
					tag="ul"
					pagination
					pagination={{ clickable: true }}
					slidesPerView={1}
				>
					{testimonials.data.map((testimonial, index) => {
						return (
							<SwiperSlide tag="li" key={index}>
								<div className="testimonial-slide">
									<img
										className="testimonial-img"
										src={
											"./images/" +
											testimonial.postedBy.split(" ")[0] +
											".jpg"
										}
									/>
									<div className="testimonial-block">
										<h2 className="char">“</h2>
										<div className="testimonial-info">
											<p className="testimonial-description">
												{testimonial.description}
											</p>
											<p className="testimonial-by">{testimonial.postedBy}</p>
											<p className="testimonial-date">
												{formatDate(testimonial.postedOn)}
											</p>
										</div>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</div>
	);
};

export default Testimonial;
