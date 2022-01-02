export const PNPReducer = (state = false, action) => {
    switch (action.type) {
      case "PNP":
        return action.payload;
      default:
        return state;
    }
  };
  