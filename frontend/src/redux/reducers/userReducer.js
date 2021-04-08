import { SET_USER, REMOVE_USER } from "../actionTypes";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) || null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      console.log("payload", payload);
      const userJSON = JSON.stringify(payload);
      sessionStorage.setItem("user", userJSON);
      return { ...state, user: payload };
    case REMOVE_USER:
      sessionStorage.removeItem("user");
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;
