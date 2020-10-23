import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import {initialState}  from "../../../reducks/store/initialState";
import SwiperCore, {Pagination} from 'swiper'
import '/Users/kentauchi/Documents/WMDD/Fall2020/Project2/savy/front-end/node_modules/swiper/swiper-bundle.css'
import "../../../../node_modules/swiper/swiper.scss"
import "./testimonial.scss"

SwiperCore.use([Pagination])


const Testimonial = () => {
    const testimonials = initialState.testimonials

    return (
        <div className="testimonial-section">
            <div className="testimonial-img">
                <img src="https://images.unsplash.com/photo-1563477710521-5ae0aa5085ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="sample"/>
            </div>
            <h2 className="char">"</h2>
            <div>
                <h2>Our Testimonial</h2>
                
                <Swiper id='main'  
                tag="ul" 
                pagination 
                pagination={{ clickable: true }}
                slidesPerView={1}
                >
                    
                        {testimonials.data.map((log, index) => {
                            return (
                            <SwiperSlide tag ="li" key={index}>
                                <p>{log.testimonial}</p>
                                <p>{log.name}</p>
                                <p>{log.date}</p>
                            </SwiperSlide>
                            )
                        })}
                    
                </Swiper>
            </div>
            

        </div>
    );
}

export default Testimonial;