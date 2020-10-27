import { createSelector } from "reselect";

const testimonialsSelector = (state) => state.testimonial;
export const getTestimonials = createSelector(
  [testimonialsSelector],
  (state) => state
);
