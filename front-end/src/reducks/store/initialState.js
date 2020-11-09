export const initialState = {
  dataSet: {
    data: [],
    mapDataTable: [],
    pieChartData: [],
  },
  testimonials: {
    data: [],
  },
  teamMembers: {
    data: [],
  },

  exploreFAQ: {
    data: [],
  },
  materials: {
    idNameType: [],
    searchedMaterial: ""
  },
  locations: {
    searchedLocations: [],
    searchedMaterialFact: {},
    loading: false,
    notFound: false
  },
  quizData: {
    data: [],
    quizLength: 0,
    currentIndex: 1,
    showScore: false,
    correctAnswer: 0,
    windowDis: false,
    correctness: false,
  },
};
