import { SELECT_DIRECTORIES } from "../actions/types";

const initialState = {
  directories: ''
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SELECT_DIRECTORIES:
    console.log(payload)
      return { 
        ...state,
        directories: payload
      };

    default:
      return state;
  }
}
