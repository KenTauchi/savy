import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { initialState } from "../../../reducks/store/initialState";
import { testimonialImportAction } from "../../../reducks/testimonials/action";
import { getTestimonials } from "../../../reducks/testimonials/selectors";
import SwiperCore, { Pagination } from "swiper";
import "../../../../node_modules/swiper/swiper-bundle.css";
import "../../../../node_modules/swiper/swiper.scss";

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

    fetch("http://localhost:3000/api/v1/testemonials")
      .then((response) => response.json())
      .then((result) => {
        dispatch(testimonialImportAction(result));
      })
      .catch(() => null);
  }, []);

  return (
    <div className="testimonial-section">
      <div className="testimonial-img">
        <img
          src="https://images.unsplash.com/photo-1563477710521-5ae0aa5085ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          alt="sample"
        />
      </div>
      <div className="teastimonial-text">
        <div>
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
                  <div>
                    <img
                      className="testimonial-img"
                      src={"./images/" + testimonial.postedBy.split(" ")[0]}
                    />
                  </div>
                  <h2 className="char">“</h2>
                  <p className="testimonial-description">
                    {testimonial.description}
                  </p>
                  <p className="testimonial-by">{testimonial.postedBy}</p>
                  <p className="testimonial-date">
                    {formatDate(testimonial.postedOn)}
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
