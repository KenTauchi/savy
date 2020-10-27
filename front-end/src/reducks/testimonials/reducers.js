import * as Actions from "./action";
import { initialState } from "../store/initialState";

export const DataTestimonialReducer = (
  state = initialState.testimonials,
  action
) => {
  switch (action.type) {
    case Actions.TESTIMONIAL_IMPORT:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
