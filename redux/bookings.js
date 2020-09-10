import * as ActionTypes from './ActionTypes';

export const bookings = (state = [], action) => {
    switch (action.type) {
        
        case ActionTypes.ADD_BOOKING:
            if (state.some(el => el === action.payload))
                return state;
            else
                return state.concat(action.payload);
        
        case ActionTypes.DELETE_BOOKING:
            return state.filter((booking) => booking !== action.payload);                
                
        default:
          return state;
      }
};
