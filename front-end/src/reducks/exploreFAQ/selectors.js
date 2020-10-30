import { createSelector } from "reselect";

const faqSelector = (state) => state.faq;
export const getFAQs = createSelector(
    [faqSelector],
    (state) => state
);