import * as ActionTypes from './ActionTypes';

export const flights = (state = { 
    isLoading: true,
    errMess: null,
    flights:[]},
 action) => {

    switch (action.type) {
        case ActionTypes.ADD_FLIGHTS:
            return {...state, isLoading: false, errMess: null, flights: action.payload};

        case ActionTypes.FLIGHTS_LOADING:
            return {...state, isLoading: true, errMess: null, flights: []}

        case ActionTypes.FLIGHTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
