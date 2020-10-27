export const TESTIMONIAL_IMPORT = "TESTIMONIAL_IMPORT";

export const testimonialImportAction = (dataResult) => {
  return {
    type: "TESTIMONIAL_IMPORT",
    payload: dataResult,
  };
};
