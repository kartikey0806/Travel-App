import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../informations/baseUrl';

export const postBooking = (flightId)  => (dispatch) => {

    setTimeout(() => {
        dispatch(addBooking(flightId));
    }, 2000);
};

export const deleteBooking = (flightId) => ({
    type: ActionTypes.DELETE_BOOKING,
    payload: flightId
}); 

export const addBooking = (flightId) => ({
    type: ActionTypes.ADD_BOOKING,
    payload: flightId
});

export const fetchFlights = () => (dispatch) => {

    dispatch(flightsLoading());

    return fetch(baseUrl + 'flights')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(flights => dispatch(addFlights(flights)))
    .catch(error => dispatch(flightsFailed(error.message)));
};

export const flightsLoading = () => ({
    type: ActionTypes.FLIGHTS_LOADING
});

export const flightsFailed = (errmess) => ({
    type: ActionTypes.FLIGHTS_FAILED,
    payload: errmess
});

export const addFlights = (flights) => ({
    type: ActionTypes.ADD_FLIGHTS,
    payload: flights
});
