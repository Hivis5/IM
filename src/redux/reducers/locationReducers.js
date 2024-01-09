const initialState = {
  region: "",
  country: "",
  locations: [],
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "ADD_LOCATION":
      return { ...state, locations: [...state.locations, action.payload] };
    default:
      return state;
  }
};

export default locationReducer;
